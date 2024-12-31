const mongoose = require('mongoose')

const schema = mongoose.Schema

const paymentSchema = new schema({
    duser_id:{type:mongoose.Types.ObjectId,ref:"disabledregistration_tbs"},
    product_category:{type:String},
    photo:{type:String},
    price:{type:String},
    quantity:{type:String},
    discription:{type:String},

})

const paymentModel = mongoose.model('payment_tb',paymentSchema)

module.exports = paymentModel