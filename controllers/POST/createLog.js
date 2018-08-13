const getClientAddress = require('client-address');

// importing models
const Log = require('../../db/models/Log');
const UserAgent = require('../../db/models/UserAgent');

const createLog = async (req, res, next) => {
  try {
    const clientIp = getClientAddress(req);
    !clientIp ? (ip = `RAND${Math.random().toString()}`) : (ip = clientIp);

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
    let fingerPrint;

    !props.fingerPrint
      ? (fingerPrint = `RAND${Math.random().toString()}`)
      : (fingerPrint = props.fingerPrint);

    const existingUserAgent = await UserAgent.findOne({ fingerPrint });

    if (!existingUserAgent) {
      const userAgent = await UserAgent.create({
        fingerPrint,
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
