const express = require('express')
const appointmentModel = require('../Models/appoinmentModel')
const doctormodel = require('../Models/doctor_reg_model')
const linkshareModel = require('../Models/linkshareRouter')

const appointmentRouter = express.Router()



appointmentRouter.post('/appointment',async function(req,res){
    try{

        const makeappointment = {
            doctor_id:req.body.doctor_id,
            duser_id:req.body.user_id,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            status: 0
          

        }

        const datas = await appointmentModel(makeappointment).save() // insert data
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


appointmentRouter.get('/viewappointment', async function (req, res) {
    try {
        const user = await appointmentModel.find()
        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
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





appointmentRouter.get('/autofillappointment/:id', async function (req, res) {
    try {
        const id =req.params.id
        console.log(id);
        const autofill = await doctormodel.findOne({_id:id})
        console.log(autofill);
        if (autofill) {
            return res.status(200).json({
                success: true,
                error: false,
                data: autofill,
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

appointmentRouter.get('/viewappointment/:id', async function (req, res) {
    try {
        const id =req.params.id
        const user = await appointmentModel.find({doctor_id:id})
        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
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

appointmentRouter.get('/approve-appointment/:approve', async function (req, res) {
    try {
        const login_id =req.params.approve
        console.log(login_id);
        const user= await appointmentModel.updateOne({_id:login_id},{$set:{status:1}})
        console.log(user);
        if (user.modifiedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message:'user approved',
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

appointmentRouter.get('/view-finisishedappointment/:approve', async function (req, res) {
    try {
        const login_id =req.params.approve
        console.log(login_id);
        const user= await appointmentModel.updateOne({_id:login_id},{$set:{status:2}})
        console.log(user);
        if (user.modifiedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message:'user approved',
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


appointmentRouter.get('/rejectappointment-doctor/:reject', async function (req, res) {
    try {
        const login_id =req.params.reject
        console.log(login_id);
        const user= await appointmentModel.deleteOne({_id:login_id})
        console.log(user);
        if(user.deletedCount==1){
            const users = await doctormodel.deleteOne({login_id:login_id})
        
        if (users.deletedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message:'user rejected',
            })
        }
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




appointmentRouter.post('/appointment',async function(req,res){
    try{

        const makeappointment = {
            doctor_id:req.body.doctor_id,
            duser_id:req.body.user_id,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            status: 0
          

        }

        const datas = await appointmentModel(makeappointment).save() // insert data
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


appointmentRouter.get('/viewappointment', async function (req, res) {
    try {
        const user = await appointmentModel.find()
        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
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




appointmentRouter.post('/linkshare',async function(req,res){
    try{

        const makeappointment = {
            doctor_id:req.body.doctor_id,
            appointment_id:req.body.appointment_id,
            date:req.body.date,
            time:req.body.time,
            link:req.body.link,
            status: 0
          

        }

        const datas = await linkshareModel(makeappointment).save() // insert data
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



appointmentRouter.get('/linkshare/:ard', async function (req, res) {
    try {
      const id=req.params.ard
      console.log("hai",id);
       
      const appoint= await appointmentModel.findOne({_id:id})
           
        if (appoint) {
            return res.status(200).json({
                success: false,
                error: true,
                data:appoint,
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
        })}
})




module.exports = appointmentRouter
