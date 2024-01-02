const express = require('express')
const userRouter = express.Router();

const {
    HandelUserSignup,
    HandelUserLogin
} = require('../Controllers/user.controllers.js')

userRouter.post("/signup", HandelUserSignup)
userRouter.post("/login", HandelUserLogin)

module.exports = {
    userRouter
}
