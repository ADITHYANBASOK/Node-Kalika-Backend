const mongoose = require('mongoose')

const schema = mongoose.Schema

const updatestockSchema = new schema({
    medicine_name:{type:String},
    photo:{type:String},
    quantity:{type:String},
    expiry_date:{type:String},
    price:{type:String},


})

const updatestockModel = mongoose.model('updatestock_tb',updatestockSchema)

module.exports = updatestockModel