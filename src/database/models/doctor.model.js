import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
  name:{
     type: String, 
     required: true
     },
  email:{
     type: String,
      required: true,
       unique: true, 
       lowercase: true,
       trim: true
      },
  phone:String,
  specialty:{
     type: String, 
     required: true 
    },
  licenseNumber: {
     type: String,
      required: true
     }
}, { 
  timestamps: true 
})

export const doctorModel = mongoose.model("Doctor", doctorSchema)
