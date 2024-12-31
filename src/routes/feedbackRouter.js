const express = require('express')


const feedbackModel = require('../Models/feebackModel')

const feedbackRouter = express.Router()

feedbackRouter.post('/feedback',async function(req,res){
    try{

        const feedback = {
            user_id:req.body.doctor_id,
            duser_id:req.body.duser_id,
           
            subject:req.body.subject,
            meesage:req.body.message,
            name:req.body.firstname,
            email:req.body.email

        }

        const datas = await feedbackModel(feedback).save() // insert data
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "feedback add succesfully completed",
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
module.exports =feedbackRouter