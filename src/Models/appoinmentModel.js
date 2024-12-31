const mongoose = require('mongoose')

const schema = mongoose.Schema

const appoinmentSchema = new schema({
    doctor_id:{type:mongoose.Types.ObjectId,ref:"doctor_registration_tb"},
    duser_id:{type:mongoose.Types.ObjectId,ref:"disabledregistration_tbs"},
    // firstname:{type:String},
    // lastname:{type:String},
    // email:{type:String},
    // phone:{type:String},
    // department:{type:String},
    // doctorname:{type:String},
    date:{type:String},
    time:{type:String},
    report:{type:String},
    status:{type:String}

})

const appointmentModel = mongoose.model('appointment_tb',appoinmentSchema)

module.exports = appointmentModel