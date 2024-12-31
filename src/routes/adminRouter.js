const express = require('express')
const loginModel = require('../Models/loginModel')
const obj= require("mongoose")
const doctormodel = require('../Models/doctor_reg_model')
const disabledModel = require('../Models/disablereg')
const registerModel = require('../Models/registerModel')
const pharmacyModel = require('../Models/pharmacyreg')
const appointmentModel = require('../Models/appoinmentModel')
const cartModel = require('../Models/cartModel')
const prescriptionModel = require('../Models/PrescriptionModel')
const productModel = require('../Models/addproduct')
const feedbackModel = require('../Models/feebackModel')
const object_id= obj.Types.ObjectId



const AdminRouter = express.Router()

AdminRouter.get('/viewappointment-doctorhome/:doctor_id', async function (req, res) {
    try {
        const doct=req.params.doctor_id


        const Appointments = await appointmentModel .aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'd_user'
              }
            }, 
            {
                "$unwind":'$d_user'

            },
            {
                "$unwind":'$doctor'

            },
            {
                '$match':{
                    "doctor_id": new object_id(doct)
                }
            },
            {
                '$match':{
                    "status": '0'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'u_firstname':{'$first':'$d_user.u_firstname'},
                    'u_lastname':{'$first':'$d_user.u_lastname'},
                    'u_email':{'$first':'$d_user.u_email'},
                    'u_number':{'$first':'$d_user.u_number'},
                    'u_address':{'$first':'$d_user.u_address'},
                    'status':{'$first':'$status'},
                }
            }
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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

AdminRouter.get('/viewapprovedappointment-doctorhome/:doctor_id', async function (req, res) {
    try {
        const doct=req.params.doctor_id


        const Appointments = await appointmentModel .aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'd_user'
              }
            }, 
            {
                "$unwind":'$d_user'

            },
            {
                "$unwind":'$doctor'

            },
            {
                '$match':{
                    "doctor_id": new object_id(doct)
                }
            },
            {
                '$match':{
                    "status": '1'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'u_firstname':{'$first':'$d_user.u_firstname'},
                    'u_lastname':{'$first':'$d_user.u_lastname'},
                    'u_email':{'$first':'$d_user.u_email'},
                    'u_number':{'$first':'$d_user.u_number'},
                    'u_address':{'$first':'$d_user.u_address'},
                    'd_firstname':{'$first':'$d_user.u_address'},
                    'd_lastname':{'$first':'$d_user.u_address'},
                    'status':{'$first':'$status'},
                }
            }
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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

AdminRouter.get('/viewapprovedappointment-userhome/:user_id', async function (req, res) {
    try {
        const doct=req.params.user_id
        console.log(doct);


        const Appointments = await appointmentModel .aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'd_user'
              }
            }, 
            {
                '$lookup': {
                  'from': 'linkshare_tbs', 
                  'localField': 'doctor_id', 
                  'foreignField': 'doctor_id', 
                  'as': 'link'
                }
              },
            {
                "$unwind":'$d_user'

            },
            {
                "$unwind":'$link'

            },
            {
                "$unwind":'$doctor'

            },
            {
                '$match':{
                    "duser_id": new object_id(doct)
                }
            },
            {
                '$match':{
                    "status": '1'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'u_firstname':{'$first':'$d_user.u_firstname'},
                    'u_lastname':{'$first':'$d_user.u_lastname'},
                    'u_email':{'$first':'$d_user.u_email'},
                    'u_number':{'$first':'$d_user.u_number'},
                    'u_address':{'$first':'$d_user.u_address'},
                    'link':{'$first':'$link.link'},

                    'd_firstname':{'$first':'$doctor.d_firstname'},
                    'd_lastname':{'$first':'$doctor.d_lastname'},
                    'status':{'$first':'$status'},
                }
            }
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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

AdminRouter.get('/viewappointmenthistory-userhome/:user_id', async function (req, res) {
    try {
        const doct=req.params.user_id
        console.log(doct);


        const Appointments = await appointmentModel .aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'd_user'
              }
            }, 
            {
                "$unwind":'$d_user'

            },
            {
                "$unwind":'$doctor'

            },
            {
                '$match':{
                    "duser_id": new object_id(doct)
                }
            },
            {
                '$match':{
                    "status": '2'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'u_firstname':{'$first':'$d_user.u_firstname'},
                    'u_lastname':{'$first':'$d_user.u_lastname'},
                    'u_email':{'$first':'$d_user.u_email'},
                    'u_number':{'$first':'$d_user.u_number'},
                    'u_address':{'$first':'$d_user.u_address'},
                    'd_firstname':{'$first':'$doctor.d_firstname'},
                    'd_lastname':{'$first':'$doctor.d_lastname'},
                    'status':{'$first':'$status'},
                }
            }
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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

AdminRouter.get('/viewappointmenthistory-adminhome', async function (req, res) {
    try {
        const doct=req.params.user_id


        const Appointments = await appointmentModel.aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'd_user'
              }
            }, 
            {
                "$unwind":'$d_user'

            },
            {
                "$unwind":'$doctor'

            },
            // {
            //     '$match':{
            //         "duser_id": new object_id(doct)
            //     }
            // },
            {
                '$match':{
                    "status": '2'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'u_firstname':{'$first':'$d_user.u_firstname'},
                    'u_lastname':{'$first':'$d_user.u_lastname'},
                    'd_firstname':{'$first':'$doctor.d_firstname'},
                    'd_lastname':{'$first':'$doctor.d_lastname'},
                    'u_email':{'$first':'$d_user.u_email'},
                    'u_number':{'$first':'$d_user.u_number'},
                    'u_address':{'$first':'$d_user.u_address'},
                    'doctor_id':{'$first':'$doctor_id'},
                    'duser_id':{'$first':'$duser_id'},
                    'status':{'$first':'$status'},
                }
            }
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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


AdminRouter.get('/doctor-user', async function (req, res) {
    try {
        const Doctor = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'doctor'
              }
            },
            {
                "$unwind":'$doctor'
            },
            {
                '$match':{
                    "status":"0"
                }
            },
            {
               "$group":{
                        '_id':'$_id',
                        'login_id':{'$first':'$doctor.login_id'},
                        'd_firstname':{'$first':'$doctor.d_firstname'},
                        'd_lastname':{'$first':'$doctor.d_lastname'},
                        'd_email':{'$first':'$doctor.d_email'},
                        'd_number':{'$first':'$doctor.d_number'},
                        'd_address':{'$first':'$doctor.d_address'},
                        'd_registration_id':{'$first':'$doctor.d_registration_id'},
                        'd_experience':{'$first':'$doctor.d_experience'},
                        'd_qualification':{'$first':'$doctor.d_qualification'},



                        'status':{'$first':'$status'},
               }
            }
          ])
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

AdminRouter.get('/doctorapproved-user', async function (req, res) {
    try {
        const Doctor = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'doctor'
              }
            },
            {
                "$unwind":'$doctor'
            },
            {
                '$match':{
                    "status":"1"
                }
            },
            {
               "$group":{
                        '_id':'$_id',
                        'd_id':{'$first':'$doctor._id'},
                        'd_firstname':{'$first':'$doctor.d_firstname'},
                        'd_lastname':{'$first':'$doctor.d_lastname'},
                        'd_email':{'$first':'$doctor.d_email'},
                        'd_number':{'$first':'$doctor.d_number'},
                        'd_address':{'$first':'$doctor.d_address'},
                        'd_registration_id':{'$first':'$doctor.d_registration_id'},
                        'd_experience':{'$first':'$doctor.d_experience'},
                        'd_qualification':{'$first':'$doctor.d_qualification'},
                        'd_specialization':{'$first':'$doctor.d_specialization'},
                        'status':{'$first':'$status'},
                        'photo':{'$first':'$doctor.photo'},
               }
            }
          ])
        if (Doctor[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: Doctor,
            })
        }
        else{
            return res.status(200).json({
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


AdminRouter.get('/viewD-user', async function (req, res) {
    try {
        const Duser = await loginModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'disabledregistration_tbs', 
                    'localField': '_id', 
                    'foreignField': 'login_id', 
                    'as': 'Duser'
                  }
                },
                {
                    "$unwind":'$Duser'
                },
                {
                    '$match':{
                        "status":"0"
                    }
                },
                {
                    "$group":{
                        '_id':'$_id',
                        'login_id':{'$first':'$Duser.login_id'},
                        'u_firstname':{'$first':'$Duser.u_firstname'},
                        'u_lastname':{'$first':'$Duser.u_lastname'},
                        'u_email':{'$first':'$Duser.u_email'},
                        'u_number':{'$first':'$Duser.u_number'},
                        'status':{'$first':'$status'},
                        'adhar':{'$first':'$Duser.adhar'}

                    }
                }
              ]
        )
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

AdminRouter.get('/viewapprovedD-user', async function (req, res) {
    try {
        const Duser = await loginModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'disabledregistration_tbs', 
                    'localField': '_id', 
                    'foreignField': 'login_id', 
                    'as': 'Duser'
                  }
                },
                {
                    "$unwind":'$Duser'
                },
                {
                    '$match':{
                        "status":"1"
                    }
                },
                {
                    "$group":{
                        '_id':'$_id',
                        'login_id':{'$first':'$Duser._id'},
                        'u_firstname':{'$first':'$Duser.u_firstname'},
                        'u_lastname':{'$first':'$Duser.u_lastname'},
                        'u_email':{'$first':'$Duser.u_email'},
                        'u_number':{'$first':'$Duser.u_number'},
                        'photo':{'$first':'$Duser.photo'},
                        'status':{'$first':'$status'},

                    }
                }
              ]
        )
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

AdminRouter.get('/viewpublic-user', async function (req, res) {
    try {
        const user = await registerModel.find()
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

AdminRouter.get('/viewpharmacy', async function (req, res) {
    try {
        const pharmacy = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'pharmacy_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'pharmacy'
              }
            },{
                "$unwind":'$pharmacy'
            },
            {
                '$match':{
                    "status":"0"
                }
            },
            {
                "$group":{
                    '_id':'$_id',
                    'login_id':{'$first':'$pharmacy.login_id'},
                    'pharmacy_name':{'$first':'$pharmacy.pharmacy_name'},
                    'owner_name':{'$first':'$pharmacy.owner_name'},
                    'licence_no':{'$first':'$pharmacy.licence_no'},
                    'p_email':{'$first':'$pharmacy.p_email'},
                    'p_number':{'$first':'$pharmacy.p_number'},
                    'p_address':{'$first':'$pharmacy.p_address'},
                    'p_pin_no':{'$first':'$pharmacy.p_pin_no'},
                    'P_doc':{'$first':'$pharmacy.P_doc'},
                    'status':{'$first':'$status'},

                }
            }
          ])
        if (pharmacy[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: pharmacy,
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

AdminRouter.get('/viewapprovedpharmacy', async function (req, res) {
    try {
        const pharmacy = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'pharmacy_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'pharmacy'
              }
            },{
                "$unwind":'$pharmacy'
            },
            {
                '$match':{
                    "status":"1"
                }
            },
            {
                "$group":{
                    '_id':'$_id',
                    'login_id':{'$first':'$pharmacy.login_id'},
                    'pharmacy_name':{'$first':'$pharmacy.pharmacy_name'},
                    'owner_name':{'$first':'$pharmacy.owner_name'},
                    'licence_no':{'$first':'$pharmacy.licence_no'},
                    'p_email':{'$first':'$pharmacy.p_email'},
                    'p_number':{'$first':'$pharmacy.p_number'},
                    'p_address':{'$first':'$pharmacy.p_address'},
                    'p_pin_no':{'$first':'$pharmacy.p_pin_no'},
                    'P_doc':{'$first':'$pharmacy.P_doc'},
                    'status':{'$first':'$status'},

                }
            }
          ])
        if (pharmacy[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: pharmacy,
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


AdminRouter.get('/approve-user/:approve', async function (req, res) {
    try {
        const login_id =req.params.approve
        console.log(login_id);
        const user= await loginModel.updateOne({_id:login_id},{$set:{status:1}})
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

AdminRouter.get('/reject-user/:reject', async function (req, res) {
    try {
        const login_id =req.params.reject
        console.log(login_id);
        const user= await loginModel.deleteOne({_id:login_id})
        console.log(user);
        if(user.deletedCount==1){
            const users = await disabledModel.deleteOne({login_id:login_id})
        
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

AdminRouter.get('/reject-pharmacy/:reject', async function (req, res) {
    try {
        const login_id =req.params.reject
        console.log(login_id);
        const user= await loginModel.deleteOne({_id:login_id})
        console.log(user);
        if(user.deletedCount==1){
            const users = await pharmacyModel.deleteOne({login_id:login_id})
        
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


AdminRouter.get('/reject-doctor/:reject', async function (req, res) {
    try {
        const login_id =req.params.reject
        console.log(login_id);
        const user= await loginModel.deleteOne({_id:login_id})
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

AdminRouter.get('/viewapprovedappointment-doctorhome/:doctorid', async function (req, res) {
    try {
        const doct=req.params.doctorid
        const Doctor = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'Duser'
              }
            }, {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'Doctor'
              }
            }, {
              '$lookup': {
                'from': 'appointment_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'Appointment'
              }
            },{
               "$unwind":'$Doctor'

            }
            ,
            {
                '$match':{
                    "Appointment.status":"1"
                }
            },{
                '$match':{
                    "Doctor._id":new object_id(doct)
                }
            }
          ])
        if (Doctor[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: Doctor,
            })
        }
        else{
            return res.status(200).json({
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

AdminRouter.get('/finish-appointment/:approve', async function (req, res) {
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


// cart

AdminRouter.get('/viewcart/:userid', async function (req, res) {
    try {
        const userid = req.params.userid
        console.log(userid);

        const usercart = await cartModel.aggregate([
            {
                '$lookup': {
                  'from': 'addproduct_tbs', 
                  'localField': 'product_id', 
                  'foreignField': '_id', 
                  'as': 'product'
                }
              }
            ,
            {
                "$unwind":'$product'
            },
            {
                '$match':{
                    "user_id": new object_id(userid)
                }
            },
            {
                '$match':{
                    "status": "0"
                }
            },
            {
                $group:{
                    '_id':'$_id',
                    'quantity':{'$first':'$quantity'},
                    'product_category':{'$first':'$product.product_category'},
                    'photo':{'$first':'$product.photo'},
                    'price':{'$first':'$product.price'},
                    'product_id':{'$first':'$product_id'},
                    'user_id':{'$first':'$user_id'}

                }
            }
          ])

  
          // Calculate the sum of item prices
        //   const sum = usercart.reduce((total, item) => total + item.price, 0);

        if (usercart[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: usercart,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    }catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

AdminRouter.get('/delete-cart/:reject', async function (req, res) {
    try {
        const login_id =req.params.reject
        console.log(login_id);
        const user= await cartModel.deleteOne({_id:login_id})
        console.log(user);
        // if(user.deletedCount==1){
        //     const users = await doctormodel.deleteOne({login_id:login_id})
        
        if (users.deletedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message:'user rejected',
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




AdminRouter.get('/addsumcart', async (req, res) => {
    try {
      // Fetch cart items from the database
      const cartItems = await cartModel.find();
  
      // Calculate the sum of item prices
      const sum = cartItems.reduce((total, item) => total + item.price, 0);
  
      res.json({ cartItems, sum });
    } catch (error) {
      console.error(error);
      res.status(4000).json({ error: 'Internal server error' });
    }
  });


//   prescription
AdminRouter.get('/dviewappoint-for-prescription/:ard', async function (req, res) {
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


// prescription

AdminRouter.get('/viewprescription-duserhome/:user_id', async function (req, res) {
    try {
        const doct=req.params.user_id
        console.log(doct);

        const Appointments = await appointmentModel.aggregate([
            {
              '$lookup': {
                'from': 'prescription_tbs', 
                'localField': '_id', 
                'foreignField': 'appointment_id', 
                'as': 'prescription'
              }
            }, {
              '$lookup': {
                'from': 'disabledregistration_tbs', 
                'localField': 'duser_id', 
                'foreignField': '_id', 
                'as': 'duser'
              }
            }, {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': 'doctor_id', 
                'foreignField': '_id', 
                'as': 'doctor'
              }
            },
                {
                    "$unwind":'$prescription'
                },
                {
                    "$unwind":'$duser'
                },
                {
                    "$unwind":'$doctor'
                },
                {
                    '$match':{
                        "_id": new object_id(doct)
                    }
                },
                {
                    '$match':{
                        "status": "2"
                    }
                },
                {
                    '$group':{
                        '_id':'$_id',
                        'date':{'$first':'$date'},
                        'duser_id':{'$first':'$duser_id'},
                        'time':{'$first':'$time'},
                        'report':{'$first':'$report'},
                        'u_firstname':{'$first':'$duser.u_firstname'},
                        'u_lastname':{'$first':'$duser.u_lastname'},
                        'd_firstname':{'$first':'$doctor.d_firstname'},
                        'd_lastname':{'$first':'$doctor.d_lastname'},
                        'd_specification':{'$first':'$doctor.d_specification'},
                        'u_email':{'$first':'$duser.u_email'},
                        'u_number':{'$first':'$duser.u_number'},
                        'u_address':{'$first':'$duser.u_address'},
                        'doctor_id':{'$first':'$doctor_id'},
                        'duser_id':{'$first':'$duser_id'},
                        'Prescription':{'$first':'$prescription.Prescription'},
                        'test':{'$first':'$prescription.test'},
                        'status':{'$first':'$status'},
                    }
                }
            
          ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments[0],
            })
        }
        else{
            return res.status(200).json({
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






AdminRouter.get('/shareprescription/:appointment', async function (req, res) {
    try {
        const appointment=req.params.appointment


        const Appointments = await appointmentModel.aggregate([
            
            
                // {
                //   '$lookup': {
                //     'from': 'prescription_tbs', 
                //     'localField': 'doctor_id', 
                //     'foreignField': 'doctor_id', 
                //     'as': 'prescription'
                //   }
                // }, 
                {
                  '$lookup': {
                    'from': 'disabledregistration_tbs', 
                    'localField': 'duser_id', 
                    'foreignField': '_id', 
                    'as': 'duser'
                  }
                }, {
                  '$lookup': {
                    'from': 'doctor_registration_tbs', 
                    'localField': 'doctor_id', 
                    'foreignField': '_id', 
                    'as': 'doct'
                  }
                },
             
                // {
                //     "$unwind":'$prescription'
    
                // },
            {
                "$unwind":'$duser'

            },
            {
                "$unwind":'$doct'

            },
            // {
            //     '$match':{
            //         "doctor_id": new object_id(appointment)
            //     }
            // },
            {
                '$match':{
                    "status": '1'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    
                    'date':{'$first':'$date'},
                    'time':{'$first':'$time'},
                    'report':{'$first':'$report'},
                    'duser_id':{'$first':'$duser._id'},
                    'u_firstname':{'$first':'$duser.u_firstname'},
                    'u_lastname':{'$first':'$duser.u_lastname'},
                    'd_firstname':{'$first':'$doct.d_firstname'},
                    'd_lastname':{'$first':'$doct.d_lastname'},
                    'u_email':{'$first':'$duser.u_email'},
                    'u_number':{'$first':'$duser.u_number'},
                    'u_address':{'$first':'$duser.u_address'},
                    'doctor_id':{'$first':'$doct_id'},
                    'duser_id':{'$first':'$duser_id'},
                    'status':{'$first':'$status'},
                    "d_specialization":{'$first':'$doct.d_specialization'}
                }
            }
         ])
        
        if (Appointments[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Appointments,
            })
        }
        else{
            return res.status(200).json({
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








//verfication

AdminRouter.get('/doctor-user/:id', async function (req, res) {
    try {
        const doct=req.params.id

        const Doctor = await loginModel.aggregate([
            {
              '$lookup': {
                'from': 'doctor_registration_tbs', 
                'localField': '_id', 
                'foreignField': 'login_id', 
                'as': 'doctor'
              }
            },
            {
                "$unwind":'$doctor'
            },
            {
                '$match':{
                    "status":"0"
                }
            },
            {
                '$match':{
                    "doctor.login_id":new object_id(doct)
                }
            },
            {
               "$group":{
                        '_id':'$_id',
                        'doctor_id':{'$first':'$doctor._id'},

                        'login_id':{'$first':'$doctor.login_id'},
                        'd_firstname':{'$first':'$doctor.d_firstname'},
                        'd_lastname':{'$first':'$doctor.d_lastname'},
                        'd_email':{'$first':'$doctor.d_email'},
                        'd_number':{'$first':'$doctor.d_number'},
                        'd_address':{'$first':'$doctor.d_address'},
                        'd_registration_id':{'$first':'$doctor.d_registration_id'},
                        'd_experience':{'$first':'$doctor.d_experience'},
                        'd_qualification':{'$first':'$doctor.d_qualification'},
                        'd_photo':{'$first':'$doctor.photo'},



                        'status':{'$first':'$status'},
               }
            }
          ])
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



AdminRouter.get('/viewD-user/:id', async function (req, res) {
    try {
        const doct=req.params.id

        const Duser = await loginModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'disabledregistration_tbs', 
                    'localField': '_id', 
                    'foreignField': 'login_id', 
                    'as': 'Duser'
                  }
                },
                {
                    "$unwind":'$Duser'
                },
                {
                    '$match':{
                        "status":"0"
                    }
                },
                {
                    '$match':{
                        "Duser.login_id":new object_id(doct)
                    }
                },
                {
                    "$group":{
                        '_id':'$_id',
                        'login_id':{'$first':'$Duser.login_id'},
                        'u_firstname':{'$first':'$Duser.u_firstname'},
                        'u_lastname':{'$first':'$Duser.u_lastname'},
                        'u_email':{'$first':'$Duser.u_email'},
                        'u_number':{'$first':'$Duser.u_number'},
                        'u_disability_doc':{'$first':'$Duser.u_disability_doc'},
                        'photo':{'$first':'$Duser.photo'},
                        'status':{'$first':'$status'},

                    }
                }
              ]
        )
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



//admin product view

// AdminRouter.get('/adminviewproduct/:userid', async function (req, res) {
//     try {
//         const userid = req.params.userid
//         console.log(userid);

//         const usercart = await disabledModel.aggregate([
//             {
//                 '$lookup': {
//                   'from': 'addproduct_tbs', 
//                   'localField': '_id', 
//                   'foreignField': 'duser_id', 
//                   'as': 'duser'
//                 }
//               }
//             ,
//             {
//                 "$unwind":'$duser'
//             },
//             {
//                 '$match':{
//                     "_id": new object_id(userid)
//                 }
//             },
            // {
            //     '$match':{
            //         "status": "0"
            //     }
            // },
            // {
            //     "$group":{
            //         '_id':'$_id',
            //         'quantity':{'$first':'$duser.quantity'},
            //         'product_category':{'$first':'$duser.product_category'},
            //         'photo':{'$first':'$duser.photo'},
            //         'price':{'$first':'$duser.price'},
            //         'discription':{'$first':'$duser.discription'},
                    // 'user_id':{'$first':'$user_id'}

        //         }
        //     }
        //   ])

  
          // Calculate the sum of item prices
        //   const sum = usercart.reduce((total, item) => total + item.price, 0);

//         if (usercart[0]!=undefined) {
//             return res.status(200).json({
//                 success: true,
//                 error: false,
//                 data: usercart,
//             })
//         }
//         else{
//             return res.status(400).json({
//                 success: false,
//                 error: true,
//                 message: "no data found",
//             })
//         }

//     }catch {
//         return res.status(400).json({
//             success: false,
//             error: true,
//             message: "Something went wrong",
//         })
//     }

// })


AdminRouter.get('/adminviewfeedback', async function (req, res) {
    try {
        // const userid = req.params.id
        // console.log("hello",userid);
        const user = await feedbackModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'registration_tbs', 
                    'localField': 'user_id', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
                },
                {
                    '$unwind':'$user'
                },
                {
                    $group:{
                        '_id':'$_id',
                        'subject':{'$first':'$subject'},
                        'firstname':{'$first':'$user.firstname'},
                        'lastname':{'$first':'$user.lastname'},
                        'email':{'$first':'$user.email'},
                        // 'product_id':{'$first':'$product_id'},
                        'status':{'$first':'$status'}

    
                    }
                }
              ]
        )
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



AdminRouter.get('/adminview1ourproduct', async function (req, res) {
    try {
        // const userid = req.params.duserid
        // console.log(userid);
        const user = await productModel.find()
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
module.exports = AdminRouter