const express = require('express')
const prescriptionModel = require('../Models/PrescriptionModel')
const appointmentModel = require('../Models/appoinmentModel')
const { generatePrescriptionPDF } = require('../Methods/Pdfmaker')
const doctormodel = require('../Models/doctor_reg_model')
const disabledModel = require('../Models/disablereg')





const prescriptionRouter = express.Router()


prescriptionRouter.post('/prescription', async function (req, res) {
    const { prescriptions, tests } = req.body;
    const { appointment_id, doctor_id, duser_id } = req.body.input;

    try {
        console.log('he',duser_id)
        const duser= await disabledModel.findOne({_id:duser_id})
        console.log('mmm',duser)
        const doctor = await doctormodel.findOne({ _id: doctor_id });
        console.log("mm",doctor)
        // Generate the PDF
        const pdfPath = await generatePrescriptionPDF(appointment_id, doctor, prescriptions, tests, duser);

        // Prepare prescription data
        const makeprescription = {
            doctor_id: doctor_id,
            duser_id: duser_id,
            appointment_id: appointment_id,
            prescriptions: prescriptions,
            tests: tests,
            status: 0
        };

        // Insert data into the database
        const datas = await prescriptionModel(makeprescription).save();

        // If successful, send a success response with the PDF path and data
        res.status(200).json({
            success: true,
            error: false,
            message: "Prescription added successfully",
            pdfPath: pdfPath,
            data: datas
        });
    } catch (error) {
        // Log the error and send an error response
        console.error('Error generating PDF or saving prescription:', error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: true,
                message: "Failed to generate PDF or save prescription",
            });
        }
    }
  });

prescriptionRouter.get('/dviewappoint-for-prescription/:ard', async function (req, res) {
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
        })
}
})





module.exports = prescriptionRouter
