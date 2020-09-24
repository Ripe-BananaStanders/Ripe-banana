const { Router } = require('express');
const Reviewer = require('../models/reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .insert({ ...req.body })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  });

// .get all reviewers  (joins)
// limit to 100 highest rated

// GET /reviewer/:id
// {
//     id,
//     name,
//     company,
//     reviews: [{
//         id,
//         rating,
//         review,
//         film: { id, title }
//     }]
// }

// .delete reviewer (only if no reviews exist)
