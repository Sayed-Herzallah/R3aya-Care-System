import Joi from "joi"
import { Types } from "mongoose"

const objectId = Joi.custom((value, helpers) => {
  if (Types.ObjectId.isValid(value)) return value
  return helpers.message("invalid id")
})

export const doctorIdSchema = Joi.object({ doctor_id: objectId.required() })

export const rateSchema = Joi.object({
  doctor_id: objectId.required(),
  stars:     Joi.number().min(1).max(5).required()
})

export const contactSchema = Joi.object({
  doctor_id: objectId.required(),
  message:   Joi.string()
})
