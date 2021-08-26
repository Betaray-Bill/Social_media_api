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
router.put('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Updated")
        } else {
            res.status(403).json("Nopess")
        }
    } catch (err) {
        res.status(403).json(err)
    }
})

// Delete a Post

router.delete('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("Deleted")
        } else {
            res.status(403).json("Nopess")
        }
    } catch (err) {
        res.status(403).json(err)
    }
})

// Like a Post

router.put('/:id/like', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("The post has been disliked")
        }
    } catch (err) {
        res.status(403).json(err)
    }
})

//get a Post
router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get timeline for a Post

module.exports = router