var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TweetsSchema = new Schema(
    {
      id: { type: Number, unique : true, required : true},
      date: String,
      text: String,
      user: { name: String, avatar: String}
    }
);

module.exports = mongoose.model('Tweets', TweetsSchema);