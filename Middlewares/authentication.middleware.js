const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send("Please log in again. Token expired or not found!");
        }

        const decodedToken = jwt.verify(token, process.env.Access_key);

        if (!decodedToken) {
            return res.status(401).send("Authentication failed. Invalid token found");
        }

        req.body.userID = decodedToken.userID;
        next();
    } catch (err) {
        console.error("Error in authentication middleware:", err.message);
        res.status(400).send({"jwt token expired":err.message});
    }
};

module.exports = {
    auth
}