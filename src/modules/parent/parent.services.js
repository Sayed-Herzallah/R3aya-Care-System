import { parentModel } from "../../database/models/parent.model.js"
import { userModel }   from "../../database/models/user.model.js"
import { encryptPhone } from "../../utils/security/encryption/encryptPhone.js"

export const getProfile = async (req, res, next) => {
  const parent = await parentModel.findOne({ userId: req.user._id })
  if (!parent) return next(new Error("parent not found", { cause: 404 }))
  return res.status(200).json({ success: true, data: { parent } })
}

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
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  return res.status(200).json({ success: true, message: "profile updated", data: { parent } })
}

export const deleteAccount = async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true })
  return res.status(200).json({ success: true, message: "account deleted" })
}