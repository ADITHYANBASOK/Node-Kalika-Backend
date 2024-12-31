const mongoose = require('mongoose')

const schema = mongoose.Schema

const stockSchema = new schema({
    medicine_name:{type:String},
    photo:{type:String},
    quantity:{type:String},
    expiry_date:{type:String},
    price:{type:String},
    batch_number:{type:String},


})

const stockModel = mongoose.model('addstock_tb',stockSchema)

module.exports = stockModel