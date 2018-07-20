var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema(
    {
      UserName: String,
      FirstName: String,
      LastName: String,
      Age: Number
    }
);

module.exports = mongoose.model('Users', UsersSchema);