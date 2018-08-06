const assert = require('assert');
const request = require('supertest');
const app = require('../../index');

// importing models
const User = require('../../db/models/User');
const Mesh = require('../../db/models/Mesh');

describe('PUT requests', () => {
  const userId = '5b662a3379c8797d475f5337';
  const userId2 = '5b662a3479c8797d475f5339';
  const orgId = '5b643eb692f6932da4cf7ae0';
  const meshId = '5b643eb692f6932da4cf7ae2';

  xit('associates org with user', async () => {
    const res = await request(app).put(`/api/users/${userId}/add/${orgId}`);
    const users = await User.findById(userId, {
      orgId: true
    });
    const userOrgId = users.orgId.filter(org => {
      return org.toString() === orgId.toString();
    });
    assert(userOrgId.length === 1);
  });

  xit('edits user info', async () => {
    const headline = 'Product at circlemesh';
    const hiring = true;
    const photos = 'hello1.photo.com';
    const res = await request(app)
      .put(`/api/users/${userId2}`)
      .send({ hiring });

    // const user = await User.findById(userId, { 'userInfo.headline': true });
    // assert(user.userInfo.headline === headline);
  });

  xit('adds mesh user', async () => {
    const res = await request(app).put(`/api/meshes/${meshId}/add/${userId}`);
    const res2 = await request(app).put(`/api/meshes/${meshId}/add/${userId2}`);
  });

  xit('adds meshuser feedback', async () => {
    const eventFeedback = 3;
    const res = await request(app)
      .put(`/api/meshes/${meshId}/feedback/${userId2}`)
      .send({
        eventFeedback
      });
    const mesh = await Mesh.findOne(
      {
        _id: meshId,
        'users._id': userId2
      },
      { 'users.$.feedback': true }
    );

    console.log(mesh);

    assert((mesh.users[0].feedback.eventFeedback = eventFeedback));
  });
});
