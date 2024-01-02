const jwt= require('jsonwebtoken')
require('dotenv').config()
const auth=async(req,res,next)=>{
    try {
        const token = req.headers.authorization
        if(!token){
            return res.status(401).send("Token expired Please login again")
        }
        const TokenValid = jwt.verify(token,process.env.Access_key);

        if(!TokenValid){
            return res.send("Authtication failed")
        }
        req.body.userID = TokenValid.userID;
        next();
    } catch (err) {
        console.log("error auth")
        return res.send(err.message)
    }
}

module.exports={
    auth
}