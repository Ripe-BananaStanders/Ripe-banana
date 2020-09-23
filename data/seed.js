const Studio = require('../lib/models/studio');

const chance = require('chance').Chance();

module.exports = async({ studioCount = 5 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.first(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }));

  await Promise.all(studiosToCreate
    .map(studio => Studio.insertStudio(studio)));
};
