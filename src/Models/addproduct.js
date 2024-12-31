const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    duser_id:{type:mongoose.Types.ObjectId,ref:"disabledregistration_tbs"},
    product_category:{type:String},
    photo:{type:String},
    price:{type:String},
    quantity:{type:String},
    discription:{type:String},

})

const productModel = mongoose.model('addproduct_tb',productSchema)

module.exports = productModel