const Mesh = require('../db/models/Mesh');
const Organizer = require('../db/models/Organizer');

const fetchMeshOrganizer = async (req, res, next) => {
  try {
    const { meshId } = req.params;
    const mesh = await Mesh.findOne(
      { _id: meshId },
      {
        organizer: true
      }
    );

    const organizerInfo = await Organizer.findOne(
      { _id: mesh.organizer },
      {
        'linkedin.firstName': 'true',
        'linkedin.lastName': 'true',
        'linkedin.url': 'true',
        'linkedin.photos': 'true',
        'linkedin.headline': 'true'
      }
    );

    res.send(organizerInfo);
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshOrganizer;
