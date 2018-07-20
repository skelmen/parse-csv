var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var Tweets = require('../models/tweets');

var client = new Twitter({
  consumer_key: 'VnlwYOgSRk3v3dTpIzMg6eSJz',
  consumer_secret: 'Dv7amiA51Zo95I8qTGullzFaNs5IIARMHyQC26iDTg1E1uYe1f',
  access_token_key: '1014870582809198595-5ziXLTAiSKY9Ge2IwbgtvPmtoDb9Fl',
  access_token_secret: 'B96HAOhHGTOvimmXRwQ2i1ALABDJG494K68GDIasz4TjQ'
});

client.get('search/tweets', { q: 'javascript', result_type: 'popular', count: 10 }, function(error, data, response) {
  if (!error) {
    Tweets.remove({}, function(err) {
        if (err) console.log(err);
      }
    );

    for (var i in data.statuses) {
      var singleTweet = new Tweets({
        id: data.statuses[i].id,
        date: data.statuses[i].created_at,
        text: data.statuses[i].text,
        user: { name: data.statuses[i].user.name, avatar: data.statuses[i].user.profile_image_url}
      });

      singleTweet.save(function(err){
        console.log('tweet has been added');
        if(err) console.log(err);
      });
    }
  }
  else {
    res.status(500).json({ error: error });
  }
});

router.get('/', function(req, res, next) {
  Tweets.find({}, function(err, result){
    if(err) throw err;
    res.render('index', { title: 'Parse Twitter', tweets: result });
  });
});


module.exports = router;
