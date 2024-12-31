const express = require('express')
const orderModel = require('../Models/orderModel')
const cartModel = require('../Models/cartModel')
const obj= require("mongoose")
const productModel = require('../Models/addproduct')

const object_id= obj.Types.ObjectId





const orderRouter = express.Router()


orderRouter.post('/order',async function(req,res){
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

orderRouter.get('/checkoutorder/:id', async function (req, res) {
    try {
        const id =req.params.id
        console.log("hello",id);
        const carts = await cartModel.find({user_id:id})
        console.log("carts",carts);
        
        const datas=[];

        for(let i=0;i<carts.length;i++){
            const orderData = new orderModel({
                product_id:carts[i].product_id,
                cart_id:carts[i]._id,
                user_id:carts[i].user_id,
                quantity:carts[i].quantity,
                status:1
            });

            console.log("order",orderData);
            await cartModel.updateOne({_id:carts[i]._id},{$set:{status:'1'}})
            datas.push(await orderData.save());
           
        }
        console.log(datas);
        console.log('carts2',carts);
        if (carts) {
            return res.status(200).json({
                success: true,
                error: false,
                data: carts,
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



orderRouter.get('/vieworder/:id', async function (req, res){
    try{
        const user_id=req.params.id
        console.log(user_id);


        const Order = await orderModel.aggregate([
            {
              '$lookup': {
                'from': 'registration_tbs', 
                'localField': 'user_id', 
                'foreignField': '_id', 
                'as': 'user'
              }
            }, {
              '$lookup': {
                'from': 'cart_tbs', 
                'localField': 'cart_id', 
                'foreignField': '_id', 
                'as': 'cart'
              }
            }, {
              '$lookup': {
                'from': 'addproduct_tbs', 
                'localField': 'product_id', 
                'foreignField': '_id', 
                'as': 'product'
              }
            },
            {
                "$unwind":'$user'

            },
            {
                "$unwind":'$cart'

            },
            {
                "$unwind":'$product'

            },
            {
                '$match':{
                    "user_id": new object_id(user_id)
                }
            },
            // {
            //     '$cart.status':'1'
            // },
            {
                $group:{
                    '_id':'$_id',
                    'discription':{'$first':'$product.discription'},
                    'price':{'$first':'$product.price'},
                    'report':{'$first':'$report'},
                    'product_category':{'$first':'$product.product_category'},
                    'quantity':{'$first':'$cart.quantity'},
                    'photo':{'$first':'$product.photo'},
                }
            }
          ])


        if (Order) {
            return res.status(200).json({
                success: true,
                error: false,
                data: Order,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    }  catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }
    })




    orderRouter.get('/cart_quantiti_incre/:approve', async function (req, res) {
        try {
            const login_id =req.params.approve
            console.log('login_id',login_id);
            const crt = await cartModel.findOne({_id:login_id})
            const pro_tb = await productModel.findOne({_id:crt.product_id})
            const quantity= parseInt(crt.quantity)+1
            console.log("cart",crt);
            const pro_quantity= parseInt(pro_tb.quantity)-1
            console.log("dec",pro_quantity);
            const product= await productModel.updateOne({_id:crt.product_id},{$set:{quantity:pro_quantity}})
            const user= await cartModel.updateOne({_id:login_id},{$set:{quantity:quantity}})
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


    orderRouter.get('/cart_quantiti_decre/:approve', async function (req, res) {
        try {
            const login_id =req.params.approve
            console.log(login_id);
            const crt = await cartModel.findOne({_id:login_id})
            const pro_tb = await productModel.findOne({_id:crt.product_id})
            const quantity= parseInt(crt.quantity)-1
            const pro_quantity= parseInt(pro_tb.quantity)+1
            const product= await productModel.updateOne({_id:crt.product_id},{$set:{quantity:pro_quantity}})
            const user= await cartModel.updateOne({_id:login_id},{$set:{quantity:quantity}})
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


    //view order duser

    orderRouter.get('/viewduserorder/:id', async function (req, res){
        try{
            const user_id=req.params.id
            console.log(user_id);
    
    
            const Order = await orderModel.aggregate([
                {
                    '$lookup': {
                        'from': 'addproduct_tbs', 
                        'localField': 'product_id', 
                        'foreignField': '_id', 
                        'as': 'product'
                    }
                }, {
                    '$lookup': {
                        'from': 'registration_tbs', 
                        'localField': 'user_id', 
                        'foreignField': '_id', 
                        'as': 'user'
                    }
                },
                {
                    "$unwind":'$user'
    
                },
                {
                    "$unwind":'$product'
    
                },
                {
                    '$match':{
                        "product.duser_id": new object_id(user_id)
                    }
                },
                {
                    $group:{
                        '_id':'$_id',
                        'discription':{'$first':'$product.discription'},
                        'price':{'$first':'$product.price'},
                        'report':{'$first':'$report'},
                        'product_category':{'$first':'$product.product_category'},
                        'quantity':{'$first':'$quantity'},
                        'photo':{'$first':'$product.photo'},
                        'uname':{'$first':'$user.firstname'},
                        'u_email':{'$first':'$user.email'},
                        'uname':{'$first':'$user.firstname'},

                    }
                }
            ])
    
    
            if (Order) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: Order,
                })
            }
            else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "no data found",
                })
            }
    
        }  catch {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Something went wrong",
            })
        }
        })





module.exports = orderRouter
