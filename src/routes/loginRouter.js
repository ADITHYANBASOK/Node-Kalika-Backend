const express = require('express')
const loginModel = require('../Models/loginModel')
const registerModel = require('../Models/registerModel')
const bcrypt = require('bcrypt');
const disabledModel = require('../Models/disablereg');
const doctormodel = require('../Models/doctor_reg_model');
const pharmacyModel = require('../Models/pharmacyreg');
const loginRouter = express.Router()

loginRouter.post('/', async function (req, res) {
    try {
        const userlog = await loginModel.findOne({ username: req.body.username })
        if (!userlog) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "username not exist",
            })
        }
        const passwordCheck = await bcrypt.compare(req.body.password, userlog.password)
       console.log(passwordCheck);
        if (passwordCheck) {
            console.log('role',userlog.role);
            if(userlog.role==0)
            return res.status(200).json({
                success: true,
                error: false,
                login_id: userlog._id,
                role:userlog.role,
                message: "login succesfully"
            })

        }if(userlog.role==1){
            console.log("hai");
            const userData =await disabledModel.findOne({login_id:userlog._id})
            return res.status(200).json({
                success: true,
                error: false,
                login_id: userlog._id,
                disabledId:userData._id,
                role:userlog.role,
                status:userlog.status,
                message: "login succesfully"
        })
       }
       if(userlog.role==2){
        console.log("hai");
        const userData =await doctormodel.findOne({login_id:userlog._id})
        return res.status(200).json({
            success: true,
            error: false,
            login_id: userlog._id,
            doctorId:userData._id,
            role:userlog.role,
            status:userlog.status,
            message: "login succesfully"
    })
    }
    if(userlog.role==3){
        console.log("hai");
        const userData =await pharmacyModel.findOne({login_id:userlog._id})
        return res.status(200).json({
            success: true,
            error: false,
            login_id: userlog._id,
            pharmacyId:userData._id,
            role:userlog.role,
            status:userlog.status,

            message: "login succesfully"
    })
    }
    if(userlog.role==4){
        console.log("hai");
        const userData =await registerModel.findOne({login_id:userlog._id})
        return res.status(200).json({
            success: true,
            error: false,
            login_id: userlog._id,
            userId:userData._id,
            role:userlog.role,
            message: "login succesfully"
    })
}


         else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "password not match"
            })
        }
    } catch {

    }

})







module.exports = loginRouter