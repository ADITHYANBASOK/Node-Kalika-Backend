const mongoose = require('mongoose')

const schema = mongoose.Schema

const prescriptionSchema = new schema({
doctor_id: { type: mongoose.Types.ObjectId, ref: "doctor_registration_tb" },
  duser_id: { type: mongoose.Types.ObjectId, ref: "disabledregistration_tbs" },
  appointment_id: { type: mongoose.Types.ObjectId, ref: "appointment_tb" },
  prescriptions: [{
    data: {
      tablet_name: { type: String, required: true },
      dosage: { type: String, required: true },
      times: { type: String, required: true }
    }
  }],
  tests: [String],
  status: { type: String }

})

const prescriptionModel = mongoose.model('prescription_tb',prescriptionSchema)

module.exports = prescriptionModel