const mongoose = require('mongoose')

const schema = mongoose.Schema

const doctorRegisterSchema = new schema({
      login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
      d_firstname:{type:String},
      d_lastname:{type:String},
      d_email:{type:String},
      d_number:{type:String},
      d_address:{type:String},
      d_registration_id:{type:String},
      d_qualification:{type:String},
      d_experience:{type:String},
      d_specialization:{type:String},
      photo:{type:String}
  
  })
  const doctormodel = mongoose.model('doctor_registration_tb',doctorRegisterSchema) 
  
  module.exports = doctormodel