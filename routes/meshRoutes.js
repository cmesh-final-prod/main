const _ = require('lodash');
const mongoose = require('mongoose').set('debug', true);
const Mesh = require('../models/Mesh');

module.exports = app => {
  // creating a new mesh network
  app.post('/api/mesh/create', async (req, res, next) => {
    const { title } = req.body;
    const mesh = await new Mesh({ title }).save();
    res.send({ status: 'mesh saved' });
    next();
  });

  // fetch all the active mesh networks AT the user's location
  app.get('/api/mesh/active', async (req, res, next) => {
    const activeMeshes = await Mesh.find();
    const meshConciseInfo = await activeMeshes.map(mesh => {
      return {
        id: mesh._id,
        title: mesh.title,
        numberOfAttendees: mesh._attendees.length
      };
    });
    res.send(meshConciseInfo);
    next();
  });

  // fetch details for the selected mesh
  app.post('/api/mesh/selected', async (req, res, next) => {
    const { id } = req.body;
    const meshDetails = await Mesh.findById(id);
    res.send(meshDetails);
    next();
  });

  // add current user to mesh selected
  app.post('/api/mesh/addAttendee', async (req, res, next) => {
    const { meshId, userId } = req.body;
    const meshSelected = await Mesh.findById(meshId);

    await Mesh.updateOne(
      { _id: meshId },
      {
        $addToSet: { _attendees: userId }
      }
    );

    const updatedMeshSelected = await Mesh.findById(meshId);

    res.send(updatedMeshSelected);
  });
};
