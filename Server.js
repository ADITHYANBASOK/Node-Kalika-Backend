const express = require('express')
const mongoose = require('mongoose')
const loginModel = require('./src/Models/loginModel')
const registerRouter = require('./src/routes/registerRouter')
const loginRouter = require('./src/routes/loginRouter')
const productRouter = require('./src/routes/productRouter')
const appointmentRouter = require('./src/routes/appointmentRouter')
const bodyParser = require('body-parser')
const stockRouter = require('./src/routes/stockRouter')
const AdminRouter = require('./src/routes/adminRouter')
const prescriptionRouter = require('./src/routes/PrescriptionRouter')
const cartRouter = require('./src/routes/cartRouter')
const orderRouter = require('./src/routes/orderRouter')
const feedbackRouter = require('./src/routes/feedbackRouter')

const path = require('path');
const fs = require('fs');



const app = express()


app.use(express.urlencoded({extended:true}))
app.use(bodyParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
// const pdfDirectory = path.join(path/folder, 'pdfs');

// // Check if the directory exists, and if not, create it
// if (!fs.existsSync(pdfDirectory)) {
//     fs.mkdirSync(pdfDirectory, { recursive: true });
// }


app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/product',productRouter)
app.use('/appointment',appointmentRouter)
app.use('/stock',stockRouter)
app.use('/admin',AdminRouter)
app.use('/prescription',prescriptionRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/feedback',feedbackRouter)







const mongoDBurl = "mongodb+srv://adithyanbasok:adithyanbasok@cluster0.a2spk3e.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoDBurl).then(() => {
    app.listen(4000, () => { console.log("server started at http://localhost:4000"); })
}).catch((error) => {
    console.log(error);
})