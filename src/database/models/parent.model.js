import mongoose from "mongoose"

const parentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
     },
  name:{
     type: String, 
     required: true 
    },
  phone:{
     type: String, 
     required: true
     },
  email:{
     type: String,
      required: true
     },
  address: String
}, {
   timestamps: true 
  })

export const parentModel = mongoose.model("Parent", parentSchema)
