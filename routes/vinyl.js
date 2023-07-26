const express = require('express');
const crudRoute = require('./crud-routes');

const vinylRoutes = express.Router();


crudRoute(
  vinylRoutes,
  '/vinyl',
  'vinyl',
  req => ({
    artist: req.body.artist,
    album: req.body.album,
    onHand: req.body.onHand,
    book: req.body.book,
    genre: req.body.genre,
    year: req.body.year,
    page: req.body.page,
    notes: req.body.notes,
    completed: req.body.completed,
    ingredientsA: req.body.ingredientsA,
    ingredientsB: req.body.ingredientsB,
  })
);



module.exports = vinylRoutes;