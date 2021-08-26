const router = require('express').Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')


router.get('/register', async(_req, res) => {
    try {
        let user = await User.find()
        console.log("Find");
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post('/register', async(req, res) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
        })

        const user = await newUser.save()
        res.status(200).json(user)

    } catch (err) {
        console.log(err);
    }
})


// Login

router.post("/login", async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("USer not Found")

        const validate_Pass = await bcrypt.compare(req.body.password, user.password);
        !validate_Pass && res.status(404).json("Password entered wrong")

        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }

})

module.exports = router