const { ObjectId } = require('mongoose').Types;

const persons = [
  { id: 1, name: 'Ch', email: 'Ch@e.com', headline: 'product at circlemesh' },
  { id: 2, name: 'Rb', email: 'Rb@e.com', headline: 'consultant at Zs' },
  { id: 3, name: 'Ku', email: 'Ku@e.com', headline: 'resident at buffalo' },
  { id: 4, name: 'Sa', email: 'Sa@e.com', headline: 'ortho at delhi' },
  { id: 5, name: 'Su', email: 'Sb@e.com', headline: 'boutique at delhi' }
];

const profiles = persons.map(person => {
  return {
    id: ObjectId(),
    name: { givenName: person.name, familyName: 'Ni' },
    emails: [{ value: person.email }],
    photos: [],
    _json: {
      headline: person.headline,
      siteStandardProfileRequest: { url: 'url' }
    }
  };
});

module.exports = profiles;
