const mongoose = require('mongoose')

const schema = mongoose.Schema

const cartSchema = new schema({
    product_id:{type:mongoose.Types.ObjectId,ref:"addproduct_tbs"},
    user_id:{type:mongoose.Types.ObjectId,ref:"registration_tbs"},
    price:{type:String},
  
    quantity:{type:String},
  
    status:{type:String}

})

const cartModel = mongoose.model('cart_tb',cartSchema)

module.exports = cartModel