const express = require('express')
const userRouter = express.Router();
const { limiter } = require('../Middlewares/rateLimitter.middleware.js');
const {
    HandelUserSignup,
    HandelUserLogin
} = require('../Controllers/user.controllers.js');


userRouter.use(limiter)
userRouter.post("/signup", HandelUserSignup)
userRouter.post("/login", HandelUserLogin)

module.exports = {
    userRouter
}
