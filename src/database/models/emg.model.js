import mongoose from "mongoose"

const emgSchema = new mongoose.Schema({
  childId:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
       required: true 
      },
  doctorId:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor" 
    },
  muscleType:{
     type: String,
      required: true 
    },
  measurementDate: { 
    type: Date,
     default: Date.now 
    },
  duration:Number,
  signalValue:Number,
  aiModelResult:String
}, {
   timestamps: true
   })

export const emgModel = mongoose.model("EMG", emgSchema)
