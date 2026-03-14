import mongoose from "mongoose"

export const roleType = {
  user: "user",
  admin: "admin"
}

const userSchema = new mongoose.Schema({
  email:{
     type: String,
      required: true, 
      unique: true,
       lowercase: true, 
       trim: true
       },
  password: {
     type: String,
      required: true 
    },
  role:{
     type: String,
      enum: Object.values(roleType),
       default: roleType.user 
      },
  confirmEmail: { 
    type: Boolean,
     default: false 
    },
  isDeleted:{
     type: Boolean, 
     default: false 
    }
}, {
   timestamps: true 
  })

export const userModel = mongoose.model("User", userSchema)
