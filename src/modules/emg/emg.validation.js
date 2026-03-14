import Joi from "joi"
import { Types } from "mongoose"

const objectId = Joi.custom((value, helpers) => {
  if (Types.ObjectId.isValid(value)) return value
  return helpers.message("invalid id")
})

export const startEMGSchema = Joi.object({
  child_id:   objectId.required(),
  muscleType: Joi.string().required(),
  doctor_id:  objectId
})

export const stopEMGSchema = Joi.object({
  emg_id:        objectId.required(),
  waveformData:  Joi.array().items(Joi.number()),
  duration:      Joi.number(),
  signalValue:   Joi.number(),
  aiModelResult: Joi.string()
})

export const childEMGSchema = Joi.object({
  child_id: objectId.required(),
  page:     Joi.number().min(1),
  limit:    Joi.number().min(1).max(50)
})
