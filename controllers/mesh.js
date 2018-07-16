const mongoose = require('mongoose').set('debug', true);
const Mesh = require('../db/models/Mesh');
const User = require('../db/models/User');
const Organizer = require('../db/models/Organizer');

module.exports = {
  async createMesh(req, res, next) {
    try {
      const { title, coordinates } = req.body;
      const { organizerId } = req.params;
      const mesh = await Mesh.create({
        title,
        geometry: {
          type: 'Point',
          coordinates
        },
        organizer: organizerId
      });

      await Organizer.update(
        { _id: organizerId },
        {
          $addToSet: { meshes: mesh._id }
        }
      );

      res.send({ message: 'Mesh Saved' });
    } catch (e) {
      next(e);
    }
  },

  async fetchMeshes(req, res, next) {
    try {
      const { lng, lat } = req.query;

      const meshes = await Mesh.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            distanceField: 'dist.calculated',
            maxDistance: 200,
            spherical: true
          }
        }
      ]);

      const conciseInfo = await meshes.map(mesh => {
        return {
          meshId: mesh._id,
          title: mesh.title,
          numberOfAttendees: mesh.users.length,
          distance: mesh.dist
        };
      });

      res.send(conciseInfo);
    } catch (e) {
      next(e);
    }
  },

  async addMeshUser(req, res, next) {
    try {
      const { meshId, userId } = req.params;
      console.log('xxxxxx', meshId, userId);
      await Mesh.update(
        {
          _id: meshId
        },
        {
          $addToSet: { users: { userId } }
        }
      );

      const mesh = await Mesh.findOne({ _id: meshId });
      await User.update(
        {
          _id: userId
        },
        {
          meshes: mesh
        }
      );
      res.send({ message: 'User saved' });
    } catch (e) {
      next(e);
    }
  },

  async fetchMeshUsers(req, res, next) {
    try {
      const { meshId } = req.params;
      const mesh = await Mesh.findOne(
        { _id: meshId },
        {
          users: true
        }
      );
      const userIds = await mesh.users.map(user => {
        if (user.active) {
          return user.userId;
        }
      });
      const usersInfo = await User.find(
        {
          _id: {
            $in: userIds
          }
        },
        {
          'linkedin.firstName': 'true',
          'linkedin.lastName': 'true',
          'linkedin.url': 'true',
          'linkedin.photos': 'true',
          'linkedin.headline': 'true'
        }
      );
      res.send(usersInfo);
    } catch (e) {
      next(e);
    }
  },

  async exitMeshUser(req, res, next) {
    try {
      const { meshId, userId } = req.params;
      await Mesh.update(
        {
          _id: meshId,
          'users.userId': userId
        },
        {
          $set: { 'users.$.active': 'false' }
        }
      );

      res.send({ userId });
    } catch (e) {
      next(e);
    }
  }
};
