const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/reviewer');
const chance = require('chance').Chance();

require('../data/data-helpers');

describe('Ripe-banana routes', () => {
  it('should INSERT a reviewer to the reviewer table via POST', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: chance.first(),
        company: chance.company(),
      })
    
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          company: expect.any(String),
        });
      });
  });
  it('get all reviewers via GET', async() => {
    const reviewers = await Reviewer.find();
    const response = await request(app)
      .get('/api/v1/reviewers');

    expect(response.body).toEqual(expect.arrayContaining(reviewers));
  });

});
