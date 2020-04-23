const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    path: String,
    location: String,
    blurb: String,
    type: String,
    created: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema);

router.post("/", validUser, upload.single('post'), async (req, res) => {
    if (!req.body.title || !req.body.location || !req.body.blurb)
        return res.status(400).send({
            message: "Please fill in a title, location, and blurb"
        });

    if (!req.file)
        return res.status(400).send({
            message: "Please upload a picture - it is a blog after all"
        });

    const post = new Post({
        user: req.user,
        title: req.body.title,
        path: "/images/" + req.file.filename,
        location: req.body.location,
        blurb: req.body.blurb,
        type: req.body.type,
    });

    try {
        await post.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
      let posts = await Post.find().sort({
        created: -1
      }).populate('user');
      return res.send(posts);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.id
        }).populate('user');
        return res.send(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

module.exports = {
    model: Post,
    routes: router
}