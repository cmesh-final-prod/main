// const requestIp = require('request-ip');
const publicIp = require('public-ip');

// importing models
const Log = require('../../db/models/Log');
const UserAgent = require('../../db/models/UserAgent');

const createLog = async (req, res, next) => {
  try {
    // const clientIp = requestIp.getClientIp(req);

    const IpV4 = await publicIp.v4();
    const IpV6 = await publicIp.v6();
    let IpV;

    // const clientIp = null;
    // !clientIp ? (ip = `RAND${Math.random().toString()}`) : (ip = clientIp);

    !IpV6 ? (IpV = IpV4) : (IpV = IpV6);
    !IpV ? (ip = `RAND${Math.random().toString()}`) : (ip = IpV);

    const timestamp = new Date().getTime();
    const props = req.body;
    const deviceProps = props.device;
    const browserProps = props.browser;
    const logProps = props.log;
    const { userId } = logProps;
    const { fellowUserId } = logProps;
    const { meshId } = logProps;
    const { componentServed } = logProps;
    const { logType } = logProps;

    const existingUserAgent = await UserAgent.findOne({ ip });

    if (!existingUserAgent) {
      const userAgent = await UserAgent.create({
        ip,
        device: deviceProps,
        browser: browserProps,
        firstVisitedAt: timestamp
      });
      await Log.create({
        userAgent,
        userId,
        fellowUserId,
        meshId,
        componentServed,
        logType,
        timestamp
      });
      res.send({ message: 'UserAgent created' });
    } else {
      const log = await Log.create({
        userAgent: existingUserAgent,
        userId,
        fellowUserId,
        meshId,
        componentServed,
        logType,
        timestamp
      });
      res.send({ message: 'UserAgent already exists' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createLog;
