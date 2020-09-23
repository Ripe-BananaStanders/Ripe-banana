const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/actor');
const chance = require('chance').Chance();

require('../data/data-helpers');

describe('Ripe-banana routes', () => {
  it('should INSERT an Actor to the actor table via POST', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: chance.first(),
        dob: chance.date(),
        pob: chance.date(),
      })
  
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          dob: expect.any(String),
          pob: expect.any(String),
        });
      });
  });
});
