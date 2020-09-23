const { Router } = require('express');
const Actor = require('../models/actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .insert({ ...req.body })
      .then(actor => res.send(actor))
      .catch(next);
  });