var express = require('express');
var router = express.Router();

var Users = require('../models/users');

router.get('/', function(req, res, next) {
  Tweets.find({}, function(err, result){
    if(err) throw err;
    res.render('index', { title: 'Upload CSV', tweets: result });
  });
});


module.exports = router;
