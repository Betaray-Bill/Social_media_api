const router = require('express').Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')

// update----------

router.put('/:id', async(req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

        } catch (err) {
            res.status(500).json(err)
        }


        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("You can update only your account")
    }
})


// Delete ---------------------
router.delete('/:id', async(req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted successfully")
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("You can delete only your account")
    }
})

// Get -------------------

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Follow a user    

router.put("/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentuser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("User has been followed")
            } else {
                res.status(403).json("you are already following")
            }

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can't follow yourself")
    }
})


// Unfollow a user    

router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentuser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403).json("you are already following")
            }

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can't follow yourself")
    }
})



module.exports = router