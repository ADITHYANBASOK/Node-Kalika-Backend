const mongoose = require('mongoose')

const schema = mongoose.Schema

const registerSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    number:{type:String},
    address:{type:String}, 
})

const registerModel = mongoose.model('registration_tb',registerSchema)

module.exports = registerModel


