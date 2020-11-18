const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  xLoc: Number,
  yLoc: Number,
  date: {
    type: String,
    default: Date.now()
  }
});

//Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
