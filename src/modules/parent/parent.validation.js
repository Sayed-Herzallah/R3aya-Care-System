import Joi from "joi"

export const updateProfileSchema = Joi.object({
  name:    Joi.string().min(3).max(20).trim(),
  phone:   Joi.string().trim(),
  address: Joi.string()
})