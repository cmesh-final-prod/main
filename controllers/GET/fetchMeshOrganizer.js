const Mesh = require('../../db/models/Mesh');
const Organizer = require('../../db/models/Organizer');

const fetchMeshOrganizer = async (req, res, next) => {
  try {
    const { meshId } = req.params;
    const mesh = await Mesh.findOne(
      { _id: meshId },
      {
        organizer: true
      }
    );

    const meshOrganizer = await Organizer.findOne(
      { _id: mesh.organizer },
      {
        'linkedin.firstName': 'true',
        'linkedin.lastName': 'true',
        'linkedin.url': 'true',
        'linkedin.photos': 'true',
        'linkedin.headline': 'true'
      }
    );

    res.send({ isAuth: true, isCompliant: true, meshOrganizer });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshOrganizer;
