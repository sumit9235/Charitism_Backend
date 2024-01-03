const { UserModel } = require('../Models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function HandelUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (
    (!name || typeof name !== 'string') ||
    (!email || typeof email !== 'string' || !isValidEmail(email)) ||
    (!password || typeof password !== 'string')
  ) {
    return res.status(400).send({ "msg": "Incomplete or invalid input data" });
  }

  try {
    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res.status(409).send({ "msg": "User already exists! Please login with credentials" });
    }

    const hash = await bcrypt.hash(password, 4);
    const newUser = new UserModel({ name, email, password: hash });
    await newUser.save();

    return res.status(201).send({ "msg": "New user has been registered" });
  } catch (err) {
    return res.status(500).send({ "msg": "Something went wrong while registering", "err": err.message });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
          let token = jwt.sign({ userID: user._id }, process.env.Access_key, { expiresIn: "15m" });
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

module.exports = {
  HandelUserSignup,
  HandelUserLogin
};
