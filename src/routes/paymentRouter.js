const express = require('express')
const paymentModel = require('../Models/paymentModel')
const obj= require("mongoose")

const object_id= obj.Types.ObjectId





const orderRouter = express.Router()



paymentRouter.post('/payment',async function(req,res){
    try{

        const makeappointment = {
            user_id:req.body.user_id,
            cart_id:req.body.cart_id,
            product_id:req.body.product_id,
            quantity:req.body.quantity,
            status: 0
          

        }

        const datas = await orderModel(makeappointment).save() // insert data
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





































module.exports = orderRouter
