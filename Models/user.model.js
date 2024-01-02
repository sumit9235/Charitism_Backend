const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String
},{
    versionKey:false
});

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}