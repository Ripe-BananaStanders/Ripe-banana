const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');
const Film = require('../lib/models/film');

const chance = require('chance').Chance();

module.exports = async({ studioCount = 5, actorCount = 5, reviewersCount = 5, filmsCount = 5 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.first(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }));

  const studios = await Promise.all(studiosToCreate
    .map(studio => Studio.insertStudio(studio)));


  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.first(),
      dob: chance.date(),
      pob: chance.date(),
    }));
    
  const actors = await Promise.all(actorsToCreate
    .map(actor => Actor.insert(actor)));


  const reviewersToCreate = [...Array(reviewersCount)]
    .map(() => ({
      name: chance.first(),
      company: chance.company()
    }));  

  await Promise.all(reviewersToCreate
    .map(reviewer => Reviewer.insert(reviewer))); 

 
  
  const filmsToCreate = [...Array(filmsCount)]
    .map(() => ({
      studioId: chance.pickone(studios).id,
      title: chance.word(),
      released: chance.exp_year(),
      filmcast: JSON.stringify([
        {
          role: chance.profession(),
          actor: chance.pickone(actors).id
        }
      ]),
    }));  

  await Promise.all(filmsToCreate
    .map(film => Film.insert(film))); 
  
};

