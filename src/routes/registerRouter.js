const express = require('express')
const loginModel = require('../Models/loginModel')
const registerModel = require('../Models/registerModel')
const bcrypt = require('bcrypt');
const doctormodel = require('../Models/doctor_reg_model');
const pharmacyModel = require('../Models/pharmacyreg');
const disabledModel = require('../Models/disablereg');
// const { default: Userregistration } = require('../../../client/src/Components/Userregistration/Userregistration');
const registerRouter = express.Router()




registerRouter.post('/userreg', async function (req, res) {
    try {
        console.log(req.body);
        const oldUser = await loginModel.findOne({ username: req.body.username })
        if (oldUser) {
            return res.status(400).json({
                success: true,
                error: false,
                message: "user already exist",
            })
        }
        const oldEmail = await registerModel.findOne({ email: req.body.Email })
        if (oldEmail) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "email already exist",
            })
        }


        
        const hashedpass = await bcrypt.hash(req.body.password, 12)
        const login = {
            password: hashedpass,
            username: req.body.username,
            role: 4,
            status: 0
        }

        const login_data = await loginModel(login).save()

        const register = {
            login_id: login_data._id,
            firstname: req.body.Firstname,
            lastname: req.body.lastname,
            email: req.body.Email,
            number: req.body.phone,
            address: req.body.Address,
            photo: req.body.photo,


        }

        const datas = await registerModel(register).save() // insert data
        console.log(datas);
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "registration completed",
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



registerRouter.get('/public-user', async function (req, res) {
    try {
        const user = await registerModel.find()
        if (user[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
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


registerRouter.post('/doctor-user',async function(req,res){
    try {
        console.log(req.body);
        const oldUser = await loginModel.findOne({ username: req.body.username })
        if (oldUser) {
            return res.status(200).json({
                success: false,
                error: true,
                message: "user already exist",
            })
        }
      
        const hashedpass = await bcrypt.hash(req.body.password, 12)
        const login = {
            password: hashedpass,
            username: req.body.username,
            role: 2,
            status: 0
        }
        const login_data = await loginModel(login).save()

        const register1 = {
            login_id: login_data._id,
            d_firstname: req.body.firstname,
            d_lastname: req.body.Lastname,
            d_email: req.body.email,
            d_number: req.body.phone,
            d_address: req.body.address,
            d_registration_id: req.body.registraction_no,
            d_qualification: req.body.qualification,
            d_experience:req.body.experience,
            d_specialization:req.body.specialization,
            photo:req.body.photo,



        }

        const datas = await doctormodel(register1).save() // insert data
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "registration completed",
                data: datas
            })
        }

    }catch{
        
    }


})

registerRouter.get('/doctor-user', async function (req, res) {
    try {
        const Doctor = await doctormodel.find()
        if (Doctor[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: Doctor,
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

registerRouter.post('/pharmacy-reg',async function(req,res){
    try {
        console.log(req.body);
        const oldUser = await loginModel.findOne({ licence_no: req.body.licence_no })
        if (oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "this pharmacy is already exist",
            })
        }
      
        const hashedpass = await bcrypt.hash(req.body.password, 12)
        const login = {
            password: hashedpass,
            username: req.body.username,
            role: 3,
            status: 0
        }
        const login_data = await loginModel(login).save()

        const register1 = {
            login_id: login_data._id,
            pharmacy_name: req.body.pharmacy_name,
            owner_name: req.body.Ownername,
            licence_no: req.body.licence_no,
            p_email: req.body.email,
            p_number: req.body.phone_no,
            p_address: req.body.address,
            p_pin_no: req.body.Pin_no,
            P_doc: req.body.pharmacy_doc,



        }

        const datas = await pharmacyModel(register1).save() // insert data
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "registration completed",
                data: datas
            })
        }

    }catch{
        
    }


})


registerRouter.get('/viewD-user', async function (req, res) {
    try {
        const Duser = await disabledModel.find()
        if (Duser[0]!=undefined) {
            return res.status(400).json({
                success: false,
                error: true,
                data: Duser,
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

registerRouter.get('/viewpharmacy', async function (req, res) {
    try {
        const Duser = await disabledModel.find()
        if (Duser[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Duser,
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


registerRouter.post('/disableduser-reg', async function (req, res) {
    try {
        console.log(req.body);
        const oldUser = await loginModel.findOne({ username: req.body.username })
        if (oldUser) {
            return res.status(200).json({
                success: false,
                error: true,
                message: "user already exist",
            })
        }
        const oldEmail = await registerModel.findOne({ email: req.body.Email })
        if (oldEmail) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "email already exist",
            })
        }


        
        const hashedpass = await bcrypt.hash(req.body.password, 12)
        const login = {
            password: hashedpass,
            username: req.body.username,
            role: 1,
            status: 0
        }

        const login_data = await loginModel(login).save()

        const register = {
            login_id: login_data._id,
            u_firstname: req.body.Firstname,
            u_lastname: req.body.lastname,
            u_email: req.body.Email,
            u_number: req.body.phone,
            u_address: req.body.Address,
            u_disability_doc:req.body.disability_doc,
            adhar:req.body.adhar,
            photo: req.body.photo,



        }

        const datas = await disabledModel(register).save() // insert data
        console.log(datas);
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "registration completed",
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


registerRouter.get('/viewDuserprofile/:id', async function (req, res) {
    try {
        const id = req.params.id
        console.log("hello",id);
        const Duser = await disabledModel.find({_id:id})
        if (Duser[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: Duser,
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



registerRouter.get('/viewdoctorprofile/:id', async function (req, res) {
    try {
        const id = req.params.id
        console.log(id);
        const Doctor = await doctormodel.find({_id:id})
        if (Doctor [0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: Doctor ,
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


registerRouter.get('/viewuserprofile/:id', async function (req, res) {
    try {
        const id = req.params.id
        console.log(id);
        const user = await registerModel.find({_id:id})
        if (user [0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
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


registerRouter.get('/updateduserourprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log(userid);
        const user = await disabledModel.find({_id:userid})
        console.log('user',user);
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



registerRouter.post('/updatedduserprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log("p_id",userid);
        const data={
            u_email:req.body.u_email,
            u_number:req.body.u_number,
            u_address:req.body.u_address
        }
        console.log("data",data);
        console.log(userid);
        const user = await disabledModel.updateOne({_id:userid},{$set:data})
        if (user) {
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

//doctor update

registerRouter.get('/updatedoctorourprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log(userid);
        const user = await doctormodel.find({_id:userid})
        console.log('user',user);
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


registerRouter.post('/updateddoctorprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log("p_id",userid);
        const data={
            d_email:req.body.d_email,
            d_number:req.body.d_number,
            d_address:req.body.d_address
        }
        console.log("data",data);
        console.log(userid);
        const user = await doctormodel.updateOne({_id:userid},{$set:data})
        if (user) {
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

//public user

registerRouter.get('/updateuserourprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log(userid);
        const user = await registerModel.find({_id:userid})
        console.log('user',user);
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


registerRouter.post('/updatedpuserprofile/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log("p_id",userid);
        const data={
            email:req.body.email,
            number:req.body.number,
            address:req.body.address
        }
        console.log("data",data);
        console.log(userid);
        const user = await registerModel.updateOne({_id:userid},{$set:data})
        if (user) {
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


module.exports = registerRouter