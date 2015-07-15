// SERVER-SIDE JAVASCRIPT

var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Post = require('./models/post.js');

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'super secret', 
  resave: false,
  saveUninitialized: true
}));


// Posts

// pre-seeded post data



// ROUTES

// Static file route(s)

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


// Data/API routes


app.get('/api/posts', function (req, res) {
  // find all posts in db
  Post.find(function (err, posts) {
    res.json(posts);
  });
});


// create new Post
app.post('/api/posts', function (req, res) {
  // create new Post with form data (`req.body`)
  var newPost = new Post({
    text: req.body.text,
    author: req.body.author
  });

  // save new Post in db
  newPost.save(function (err, savedPost) {
    res.json(savedPost);
  });
});


// get one Post
app.get('/api/posts/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find Post in db by id
  Post.findOne({_id: targetId}, function (err, foundPost) {
    res.json(foundPost);
  });
});

// update single post
// update Post
app.put('/api/posts/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find Post in db by id
  Post.findOne({_id: targetId}, function (err, foundPost) {
    // update the Post's text and author
    foundPost.text = req.body.text;
    foundPost.author = req.body.author;

    // save updated Post in db
    foundPost.save(function (err, savedPost) {
      res.json(savedPost);
    });
  });
});

// delete post
// delete Post
app.delete('/api/posts/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find Post in db by id and remove
  Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});
// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});