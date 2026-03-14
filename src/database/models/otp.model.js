import mongoose from "mongoose"
export const otpType = {
  forgetPassword: "forgetPassword",
  verifyEmail: "verifyEmail"
}
const otpSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    },
  email:{
     type: String,
      required: true
     },
  otp:{
     type: String,
      required: true 
    },
  typeOtp: {
    type: String,
     required: true,
    enum: Object.values(otpType)
  }
}, { 
  timestamps: true 
})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }) // 10 min TTL

export const otpModel = mongoose.model("OTP", otpSchema)
