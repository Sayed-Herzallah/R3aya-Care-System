import { userModel }   from "../../database/models/user.model.js"
import { parentModel } from "../../database/models/parent.model.js"
import { otpModel, otpType } from "../../database/models/otp.model.js"
import { hashPassword, verifyPassword } from "../../utils/security/hashing/hashpassword.js"
import { encryptPhone }  from "../../utils/security/encryption/encryptPhone.js"
import { generateToken } from "../../utils/security/token/tokenAuth.js"
import { sendEmails, subject } from "../../utils/sendemail/sendEmail.js"
import generateHTML      from "../../utils/sendemail/generatehtml.js"
import { customAlphabet } from "nanoid"

const generateOTP = customAlphabet("0123456789", 4)

const createToken = (userId, role, email) =>
  generateToken({
    payload: { id: userId, role, email },
    options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  })

// ─── Register ──────────────────────────────────────────────────────────────────
export const registerUser = async (req, res, next) => {
  const { name, email, phone, password, address } = req.body

  const exists = await userModel.findOne({ email })
  if (exists) return next(new Error("user already exists", { cause: 409 }))

  const user = await userModel.create({
    email,
    password: hashPassword({ plainText: password })
  })

  await parentModel.create({
    userId:  user._id,
    name,
    email,
    phone:   encryptPhone({ plainText: phone }),
    address
  })

  const otp = generateOTP()
  await otpModel.create({ email, otp, typeOtp: otpType.verifyEmail })
  await sendEmails({ to: email, subject: subject.verifyEmail, html: generateHTML({ userName: name, otp }) })

  return res.status(201).json({
    success: true,
    message: "registered — OTP sent to email",
    data: { userId: user._id, email: user.email }
  })
}

// ─── Verify Email ──────────────────────────────────────────────────────────────
export const verifyEmail = async (req, res, next) => {
  const { email, code } = req.body

  const user = await userModel.findOne({ email })
  if (!user)             return next(new Error("user not found",   { cause: 404 }))
  if (user.confirmEmail) return next(new Error("already verified", { cause: 409 }))

  const otpRecord = await otpModel.findOne({ email, otp: code, typeOtp: otpType.verifyEmail })
  if (!otpRecord) return next(new Error("invalid OTP", { cause: 400 }))

  await userModel.findOneAndUpdate({ email }, { confirmEmail: true })
  await otpModel.deleteMany({ email, typeOtp: otpType.verifyEmail })

  return res.status(200).json({
    success: true,
    message: "email verified",
    data: { token: createToken(user._id, user.role, user.email) }
  })
}

// ─── Login ─────────────────────────────────────────────────────────────────────
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })
  if (!user)              return next(new Error("user not found",            { cause: 404 }))
  if (!user.confirmEmail) return next(new Error("please verify email first", { cause: 409 }))
  if (!verifyPassword({ plainText: password, hash: user.password }))
    return next(new Error("invalid password", { cause: 400 }))

  const parent = await parentModel.findOne({ userId: user._id })

  return res.status(200).json({
    success: true,
    message: "logged in",
    data: { token: createToken(user._id, user.role, user.email), parent }
  })
}

// ─── Forget Password ───────────────────────────────────────────────────────────
export const frogetPassword = async (req, res, next) => {
  const { email } = req.body

  const user = await userModel.findOne({ email })
  if (!user)              return next(new Error("user not found",  { cause: 404 }))
  if (!user.confirmEmail) return next(new Error("user not active", { cause: 409 }))

  const otp = generateOTP()
  await otpModel.create({ email, otp, typeOtp: otpType.forgetPassword })
  await sendEmails({ to: email, subject: subject.forgetPassword, html: generateHTML({ userName: email, otp }) })

  return res.status(200).json({ success: true, message: "OTP sent to email" })
}

// ─── Reset Password ────────────────────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  const { email, code, password } = req.body

  const user = await userModel.findOne({ email })
  if (!user) return next(new Error("user not found", { cause: 404 }))

  const otpRecord = await otpModel.findOne({ email, otp: code, typeOtp: otpType.forgetPassword })
  if (!otpRecord) return next(new Error("invalid OTP", { cause: 400 }))

  await userModel.findOneAndUpdate({ email }, { password: hashPassword({ plainText: password }) })
  await otpModel.deleteMany({ email, typeOtp: otpType.forgetPassword })

  return res.status(200).json({
    success: true,
    message: "password reset",
    data: { token: createToken(user._id, user.role, user.email) }
  })
}

// ─── Get Profile ───────────────────────────────────────────────────────────────
export const getProfile = async (req, res, next) => {
  const parent = await parentModel.findOne({ userId: req.user._id })
  if (!parent) return next(new Error("profile not found", { cause: 404 }))
  return res.status(200).json({ success: true, data: { parent } })
}

// ─── Update Profile ────────────────────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
  const { name, phone, address } = req.body
  const updateData = {}

  if (name)    updateData.name    = name
  if (address) updateData.address = address
  if (phone)   updateData.phone   = encryptPhone({ plainText: phone })

  const parent = await parentModel.findOneAndUpdate(
    { userId: req.user._id },
    updateData,
    { new: true }
  )
  return res.status(200).json({ success: true, message: "profile updated", data: { parent } })
}