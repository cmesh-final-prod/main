const Organizer = require('../../db/models/Organizer');
const latestPolicyUpdateOn = require('../../utils/termsOfUse');

const createOrganizer = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const createdAt = new Date().getTime();

    await Organizer.remove();

    const organizer = await Organizer.create({
      firstName,
      lastName,
      createdAt,
      termsOfUse: {
        latestPolicyUpdateOn,
        accepted: true,
        acceptedAt: createdAt
      }
    });

    res.send({ message: 'Organizer Created', organizer });
  } catch (e) {
    next(e);
  }
};

module.exports = createOrganizer;
