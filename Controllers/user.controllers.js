const { UserModel } = require('../Models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function HandelUserSignup(req, res) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).send({ "msg": "Incomplete input data" });
    }

    try {
        bcrypt.hash(password, 4, async (err, hash) => {
            if (err) {
                return res.status(500).send({ "msg": "Internal server error", "err": err.message });
            } else {
                const user = new UserModel({ name, email, password: hash });
                await user.save();
                return res.status(201).send({ "msg": "New user has been registered" });
            }
        });
    } catch (err) {
        return res.status(500).send({ "msg": "Something went wrong while registering", "err": err.message });
    }
}

async function HandelUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ "msg": "Incomplete input data" });
    }

    try {
        const user = await UserModel.findOne({ email });
        
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id }, "SecretKey", { expiresIn: "15m" });
                    return res.send({ "msg": "User logged in successfully", "token": token });
                } else {
                    return res.status(401).send({ "msg": "Wrong credentials" });
                }
            });
        } else {
            return res.status(404).send({ "msg": "User not found" });
        }
    } catch (err) {
        return res.status(500).send({ "msg": "Something went wrong", "err": err.message });
    }
}

module.exports={
    HandelUserSignup,
    HandelUserLogin
}