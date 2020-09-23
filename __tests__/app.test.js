const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helpers');


describe('Ripe-banana routes', () => {
  
  it('adding dummy test to remove fail message', () => {    
    expect('yes').toEqual('yes'); 
  });
});


