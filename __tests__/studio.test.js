const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Studio = require('../lib/models/studio');
const chance = require('chance').Chance();

require('../data/data-helpers');


describe('Ripe-banana routes', () => {
  it('should INSERT a studio to the studio table via POST', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: chance.first(),
        city: chance.city(),
        state: chance.state(),
        country: chance.country()
      })

      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          country: expect.any(String)
        });
      });
  });

  it('gets a studio by id via GET', async() => {
    const studio = (await Studio.find())[0];
    const response = await request(app)
      .get(`/api/v1/studios/${studio.id}`);
  
    expect(response.body).toEqual(studio);
  });

  it('get all studios via GET', async() => {
    const studios = await Studio.find();
    const response = await request(app)
      .get('/api/v1/studios');

    expect(response.body).toEqual(expect.arrayContaining(studios));
  });

});
