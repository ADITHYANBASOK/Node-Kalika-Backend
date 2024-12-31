const express = require('express')
const stockModel = require('../Models/addstockModel')
const updatestockModel = require('../Models/updatestockModel')
const stockRouter = express.Router()




stockRouter.post('/addstock',async function(req,res){
    try{

        const Addstock = {
            medicine_name: req.body.medicinename,
            photo: req.body.image,
            quantity: req.body.quantity,
            expiry_date: req.body.Expirydate,
            price:req.body.price,
            batch_number:req.body.batch_number
          

        }

        const datas = await stockModel(Addstock).save() // insert data
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "product add succesfully completed",
                data: datas
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

stockRouter.post('/updatestock',async function(req,res){
    try{

        const updatestock = {
            medicine_name: req.body.medicinename,
            photo: req.body.image,
            quantity: req.body.quantity,
            expiry_date: req.body.Expirydate,
            price:req.body.price,
            batch_number:req.body.batch_number
          

        }

        const datas = await updatestockModel(updatestock).save() // insert data
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "product add succesfully completed",
                data: datas
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

stockRouter.get('/viewstock', async function (req, res) {
    try {
        const Stock = await stockModel.find()
        if (Stock[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Stock,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})






















module.exports = stockRouter