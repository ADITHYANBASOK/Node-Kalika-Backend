const express = require('express')
const productModel = require('../Models/addproduct')
const multer = require('multer')
const productRouter = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/products')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name)
    }
  })
  
const upload = multer({ storage: storage })


productRouter.post('/upload-image',upload.single('file'),(req,res)=>{
    res.status(200).json({
        message:"image added"
    })
})




productRouter.post('/addproduct',async function(req,res){
    try{

        const Addproduct = {
            product_category: req.body.category,
            duser_id:req.body.user_id,
            photo: req.body.photo,
            price: req.body.price,
            quantity:req.body.quantity,
            discription: req.body.discription,
          

        }
        console.log(Addproduct);

        const datas = await productModel(Addproduct).save() // insert data
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


productRouter.post('/viewproduct/:category', async function (req, res) {
    try {
        const category = req.params.category
        if(category=="All"){
            const user = await productModel.find()
        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
            })
        }

        }
        else{  // console.log(category);
            const user = await productModel.find({product_category:category})
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
            }}
      

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

productRouter.get('/viewourproduct/:duserid', async function (req, res) {
    try {
        const userid = req.params.duserid
        // console.log(userid);
        const user = await productModel.find({duser_id:userid})
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


productRouter.get('/updateourproduct/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log(userid);
        const user = await productModel.find({_id:userid})
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


productRouter.post('/updatedproducts/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log("p_id",userid);
        const data={
            price:req.body.price,
            quantity:req.body.quantity,
            discription:req.body.discription
        }
        console.log("data",data);
        console.log(userid);
        const user = await productModel.updateOne({_id:userid},{$set:data})
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



productRouter.get('/adminviewourproduct/:duserid', async function (req, res) {
    try {
        const userid = req.params.duserid
        // console.log(userid);
        const user = await productModel.find({duser_id:userid})
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


productRouter.get('/adminviewourproduct', async function (req, res) {
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














module.exports = productRouter
