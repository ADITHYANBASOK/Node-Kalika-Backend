const mongoose = require('mongoose')

const schema = mongoose.Schema

const orderSchema = new schema({
    user_id:{type:mongoose.Types.ObjectId,ref:"registration_tb"},
    cart_id:{type:mongoose.Types.ObjectId,ref:"cart_tb"},
    product_id:{type:mongoose.Types.ObjectId,ref:"addproduct_tb"},
    quantity:{type:String},
    status:{type:String},

})

const orderModel = mongoose.model('order_tb',orderSchema)

module.exports = orderModel