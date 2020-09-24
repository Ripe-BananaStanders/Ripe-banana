const app = require('../lib/app');
const request = require('supertest');
const Actor = require('../lib/models/actor');
const Studio = require('../lib/models/studio');
const Film = require('../lib/models/film');
const chance = require('chance').Chance();

require('../data/data-helpers');

describe('Film-routes', () => {
  it('should INSERT a Film to the films table via POST', async() => {
    const studio = (await Studio.find())[0];
    const placementActor = (await Actor.find())[0];

    return request(app)
      .post('/api/v1/films')
      .send({
        studioId: studio.id,
        title: chance.word(),
        released: chance.exp_year(),
        filmcast: JSON.stringify([
          {
            role: chance.profession(),
            actor: placementActor.id
          }
        ])
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          studioId:  expect.any(String),
          title:  expect.any(String),
          released:  expect.any(Number),
          filmcast: expect.any(Array)
        });
      });
    
  });


});
