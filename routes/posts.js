const User = require('../models/User')
const Post  = require('../models/Post')
const bcrypt = require('bcrypt')
const router = require('express').Router()





/// CREATE A POST

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


///UPDATE A POST

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {
                    new: true
                });
                res.status(200).json(updatedPost)
            } catch (error) {
                
            }
        } else {
            res.status(401).json("you are not allowed to update this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


///DELETE A POST

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted successfully")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("you are not allowed to update this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

///GET A SINGLE POST

router.get("/:id", async (req, res) => {
    try {
        const post =  await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    } 
    
})


///GET MORE POSTS

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                }
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports =  router