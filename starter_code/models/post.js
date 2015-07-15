
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostsSchema = new Schema({
  text: String,
  author: String
});

var Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;