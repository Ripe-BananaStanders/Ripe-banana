const { Router } = require('express');
const Actor = require('../models/actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .insert({ ...req.body })
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor
      .find()
      .then(actors => res.send(actors))
      .catch(next);
  });

// .get all actors with film ref films id on the joins


// .post for actors
