const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema
//build teh user schema
const userSchema = new Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
})
//statics is prop that let you make methods that model can access later
userSchema.statics.signIn = async function(user ,  password){
   

    const match = await bcrypt.compare(password , user.password)
    
    return match

}
userSchema.statics.signup = async function(email , password){
    
    const exists = await this.findOne({email})
    if(exists){
        throw new Error("this email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)
    const user = await this.create({email , password : hash})
    return user

}
//export the user model
module.exports =  mongoose.model("User" , userSchema)
