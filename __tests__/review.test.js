const app = require('../lib/app');
const request = require('supertest');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');
const Film = require('../lib/models/film');
const Review = require('../lib/models/review');
const chance = require('chance').Chance();

require('../data/data-helpers');

describe('Review-routes', () => {
  it('should INSERT a review to the reviews table via POST', async() => {
    const reviewer = (await Reviewer.find())[0];
    // const film = (await Film.find())[0];

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        reviewerId: reviewer.id,
        review: chance.sentence(),
        filmId: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          rating: expect.any(Number),
          reviewerId: expect.any(String),
          review: expect.any(String),
          filmId: '4'

          
        });
      });
      
   
    
  });
  
  it('get all reviews via GET', async() => {
    const reviews = await Review.find();
    const response = await request(app)
      .get('/api/v1/reviews');

    expect(response.body).toEqual(expect.arrayContaining(reviews));
  });

});
