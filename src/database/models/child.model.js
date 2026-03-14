import mongoose from "mongoose"

const childSchema = new mongoose.Schema({
  name:{
     type: String, 
     required: true 
    },
  dateOfBirth:{
     type: Date, 
     required: true
     },
  gender:{
     type: String,
      enum: ["male", "female"], 
      required: true 
    },
  initialDiagnosis: String,
  registrationDate: {
     type: Date, 
     default: Date.now
     },
  parentId:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
       required: true 
      },
  assignedDoctorId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor" 
    }
}, {
   timestamps: true 
  })

export const childModel = mongoose.model("Child", childSchema)
