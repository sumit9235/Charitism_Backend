const express = require('express')
const userRouter = express.Router();
const { limiter } = require('../Middlewares/rateLimitter.middleware.js');
const {
    HandelUserSignup,
    HandelUserLogin
} = require('../Controllers/user.controllers.js');


userRouter.use(limiter) //using rate limitger to limit number of request to 8 requests per minute
userRouter.post("/signup", HandelUserSignup)
userRouter.post("/login", HandelUserLogin)

module.exports = {
    userRouter
}
