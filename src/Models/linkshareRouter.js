const mongoose = require('mongoose')

const schema = mongoose.Schema

const linkshareSchema = new schema({
    doctor_id:{type:mongoose.Types.ObjectId,ref:"doctor_registration_tbs"},
    appointment_id:{type:String},
    time:{type:String},
    date:{type:String},
    link:{type:String},
   

})

const linkshareModel = mongoose.model('linkshare_tbs',linkshareSchema)

module.exports = linkshareModel