const mongoose = require('mongoose')

const schema = mongoose.Schema

const feedbackSchema = new schema({
    user_id:{type:mongoose.Types.ObjectId,ref:"registration_tbs"},
    name:{type:String},
    email:{type:String},

   subject:{type:String},
   meesage:{type:String},
   

})

const feedbackModel = mongoose.model('feedback_tb',feedbackSchema)

module.exports = feedbackModel