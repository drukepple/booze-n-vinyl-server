const express = require('express');
const crudRoute = require('./crud-routes');

const boozeRoutes = express.Router();


crudRoute(
  boozeRoutes,
  '/booze',
  'booze',
  req => ({
    name: req.body.name,
    onHand: req.body.onHand,
    category: req.body.category,
  }),
  {category: 1}
);


crudRoute(
  boozeRoutes,
  '/category',
  'category',
  req => ({ name: req.body.name, })
);





module.exports = boozeRoutes;