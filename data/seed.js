const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');

const chance = require('chance').Chance();

module.exports = async({ studioCount = 5, actorCount = 5, reviewersCount = 5  } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.first(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }));

  await Promise.all(studiosToCreate
    .map(studio => Studio.insertStudio(studio)));


  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.first(),
      dob: chance.date(),
      pob: chance.date(),
    }));
    
  await Promise.all(actorsToCreate
    .map(actor => Actor.insert(actor)));

  const reviewersToCreate = [...Array(reviewersCount)]
    .map(() => ({
      name: chance.first(),
      company: chance.company()
    }));  

  await Promise.all(reviewersToCreate
    .map(reviewer => Reviewer.insert(reviewer))); 
};

