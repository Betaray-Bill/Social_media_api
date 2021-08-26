const router = require('express').Router();
const Post = require('../Models/Post')

// Create a Post
router.post("/", async(req, res) => {
    const post = new Post(req.body)

    try {
        const saved_post = await post.save()
        res.status(200).json(saved_post)

    } catch (err) {
        res.status(500).json(err)
    }
})

// Update a Post
// Delete a Post
// Like a Post
// get a Post
// Get timeline for a Post

module.exports = router