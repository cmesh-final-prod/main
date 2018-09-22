const axios = require("axios");
const keys = require("../config/keys");
const { ObjectId } = require("mongoose").Types;

// importing models
const Org = require("../db/models/Org");

// importing utils
const jwt = require("./jwt");

module.exports = {
  syncMeetupsAndMeshes(orgId) {
    const jwtToken = jwt.encode(orgId);
    axios.get(`${keys.selfURL}/api/orgs/meetups/sync`, {
      headers: { authorization: jwtToken }
    });
  },

  async fetchMeetups(urlName, accessToken) {
    try {
      const only = "id,name,duration,time,updated,venue,link,created";
      const url = `https://api.meetup.com/${urlName}/events/?access_token=${accessToken}&only=${only}`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return e.Error;
    }
  },

  async createMesh(meshProps, eventProps, coordinates, orgId) {
    try {
      const jwtToken = jwt.encode(orgId);
      const response = await axios.post(
        `${keys.selfURL}/api/meshes/create`,
        {
          ...meshProps,
          ...eventProps,
          coordinates
        },
        {
          headers: { authorization: jwtToken }
        }
      );
      const { startDate } = meshProps;
      const [lon] = meshProps.coordinates;
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },

  async updateLastSync(orgId) {
    try {
      const lastSync = new Date().getTime();
      const props = { lastSync };
      const jwtToken = jwt.encode(orgId);
      const response = await axios.put(
        `${keys.selfURL}/api/orgs/update`,
        props,
        {
          headers: { authorization: jwtToken }
        }
      );
      return;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  updateMesh(meshProps, eventProps, coordinates, eventId) {
    const repsonse = axios.put(`${keys.selfURL}/api/meshes/${eventId}/update`, {
      meshProps,
      eventProps,
      coordinates
    });
    return;
  },

  async fetchMeetupGroups(accessToken) {
    const only = "id,urlname,self.role,name";
    const fields = "self";
    const url = `https://api.meetup.com/self/groups/?access_token=${accessToken}&fields=${fields}&only=${only}`;
    const response = await axios.get(url);
    return response.data;
  },

  async fetchMeetupGroupInfo(urlName) {
    const url = `https://api.meetup.com/${urlName}`;
    const response = await axios.get(url);
    return response.data;
  },

  async addMeetupGroupSummary(
    orgId,
    summary,
    memberId,
    accessToken,
    refreshToken
  ) {
    await Org.update(
      { _id: orgId },
      {
        meetup: {
          summary,
          memberId,
          accessToken: jwt.encode(accessToken),
          refreshToken: jwt.encode(refreshToken)
        }
      }
    );

    return;
  }
};
