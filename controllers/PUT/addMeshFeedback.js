const Mesh = require('../../db/models/Mesh');

const addMeshFeedback = async (req, res, next) => {
  try {
    const { meshId, userId } = req.params;
    const feedbackProps = req.body;
    let feedback = {};

    for (var key in feedbackProps) {
      if (feedbackProps.hasOwnProperty(key)) {
        const prop = `users.$.feedback.${key}`;
        feedback[prop] = feedbackProps[key];
      }
    }

    await Mesh.update(
      {
        _id: meshId,
        'users._id': userId
      },
      feedback
    );

    res.send({ message: 'Feedback saved' });
  } catch (e) {
    next(e);
  }
};

module.exports = addMeshFeedback;
