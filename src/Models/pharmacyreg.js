const mongoose = require('mongoose')

const schema = mongoose.Schema

const registerSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    pharmacy_name:{type:String},
    owner_name:{type:String},
    licence_no:{type:String},
    p_email:{type:String},
    p_number:{type:String},
    p_address:{type:String},
    p_pin_no:{type:String},
    P_doc:{type:String},
})

const pharmacyModel = mongoose.model('pharmacy_registration_tb',registerSchema)

module.exports = pharmacyModel