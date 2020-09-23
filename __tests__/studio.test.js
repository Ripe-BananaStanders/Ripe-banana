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



});
