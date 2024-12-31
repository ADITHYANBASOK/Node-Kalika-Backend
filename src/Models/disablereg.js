const mongoose = require('mongoose')

const schema = mongoose.Schema

const registerSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    u_firstname:{type:String},
    u_lastname:{type:String},
    u_email:{type:String},
    u_number:{type:String},
    u_address:{type:String},
    adhar:{type:String},
    u_disability_doc:{type:String},
    photo:{type:String}

})

const disabledModel = mongoose.model('disabledregistration_tb',registerSchema)

module.exports = disabledModel
