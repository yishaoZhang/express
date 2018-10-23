var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var resData = require('../config/res');

router.use(
  function(req, res, next) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html'
    });
    next();
  }
);

module.exports = router;