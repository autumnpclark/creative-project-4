const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const posts = require("./posts.js");
const Post = posts.model;


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
})

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", validUser, async (req, res) => {
    // check parameters
    if (!req.body.text)
      return res.status(400).send({
        message: "Must input a comment."
      });
    
    const comment = new Comment({
      user: req.user,
      post: req.body.post,
      text: req.body.text,
    });
    try {
      await comment.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});


router.get("/post/:postId", async (req, res) => {
    try {
        let comment = await Comment.find({
            post: req.params.postId
        }).sort({
            created: -1
        }).populate('user');
        return res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});


module.exports = {
    model: Comment,
    routes: router,
  }