const { Router } = require('express');
const Studio = require('../models/studio');

module.exports = Router()
  .post('/',  (req, res, next) => {
    Studio
      .insertStudio({ ...req.body })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next);
  });

// .get all studios by id w/ films by id (joins)

// GET /studios/:id
// { id, name, city, state, country, films: [{ id, title, studio }] }
  
