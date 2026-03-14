import Joi from "joi"

export const registerSchema = Joi.object({
  name:            Joi.string().min(3).max(20).trim().required(),
  email:           Joi.string().email().lowercase().trim().required(),
  phone:           Joi.string().trim().required(),
  password:        Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  address:         Joi.string()
})

export const loginSchema = Joi.object({
  email:    Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).required()
})

export const verifyEmailSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  code:  Joi.string().required()
})

export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
})

export const resetPasswordSchema = Joi.object({
  email:           Joi.string().email().lowercase().trim().required(),
  code:            Joi.string().required(),
  password:        Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required()
})

export const updateProfileSchema = Joi.object({
  name:    Joi.string().min(3).max(20).trim(),
  phone:   Joi.string().trim(),
  address: Joi.string()
})