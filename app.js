const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')

// Routes Calling from Other modules

const userRoutes = require("./Routes/User")
const AuthRoutes = require("./Routes/Auth")
const PostRoutes = require("./Routes/Post")


const app = express()

dotenv.config()
app.use(bodyParser.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000


// Database Connection
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(console.log("Connected to database"))
    .catch(console.error)


// Middleware
app.use(helmet())
app.use(morgan("common"))


// Routing
app.use("/user", userRoutes)
app.use("/auth", AuthRoutes)
app.use("/post", PostRoutes)

// Port Opening
app.listen(PORT, () => {
    console.log(`Server opened in ${PORT}`)
})