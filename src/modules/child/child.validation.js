import Joi from "joi"
import { Types } from "mongoose"

const objectId = Joi.custom((value, helpers) => {
  if (Types.ObjectId.isValid(value)) return value
  return helpers.message("invalid id")
})

export const addChildSchema = Joi.object({
  name:             Joi.string().trim().required(),
  dateOfBirth:      Joi.date().required(),
  gender:           Joi.string().valid("male", "female").required(),
  initialDiagnosis: Joi.string(),
  condition:        Joi.string(),
  treatment:        Joi.string(),
  therapyPlan:      Joi.string()
})

export const updateChildSchema = Joi.object({
  child_id:        objectId.required(),
  condition:       Joi.string(),
  treatment:       Joi.string(),
  therapyPlan:     Joi.string(),
  progress:        Joi.number().min(0).max(100),
  therapistNotes:  Joi.string(),
  currentState:    Joi.string()
})

export const childIdSchema = Joi.object({
  child_id: objectId.required()
})
