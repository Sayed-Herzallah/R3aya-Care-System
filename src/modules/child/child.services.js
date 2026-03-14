import { childModel }  from "../../database/models/child.model.js"
import { parentModel } from "../../database/models/parent.model.js"

const getParent = async (userId) => parentModel.findOne({ userId })

export const getHomeData = async (req, res, next) => {
  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const children = await childModel
    .find({ parentId: parent._id })
    .populate("assignedDoctorId", "name specialty isOnline")

  return res.status(200).json({
    success: true,
    data: { parentName: parent.name, children, lastUpdate: new Date() }
  })
}

export const addChild = async (req, res, next) => {
  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const { name, dateOfBirth, gender, initialDiagnosis } = req.body

  const child = await childModel.create({
    name, dateOfBirth, gender, initialDiagnosis,
    parentId: parent._id
  })

  return res.status(201).json({ success: true, message: "child added", data: { child } })
}

export const getChildProfile = async (req, res, next) => {
  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const child = await childModel
    .findOne({ _id: req.params.child_id, parentId: parent._id })
    .populate("assignedDoctorId", "name specialty phone email averageRating")

  if (!child) return next(new Error("child not found", { cause: 404 }))

  return res.status(200).json({ success: true, data: { child } })
}

export const getChildStatus = async (req, res, next) => {
  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const child = await childModel.findOne({ _id: req.params.child_id, parentId: parent._id })
  if (!child) return next(new Error("child not found", { cause: 404 }))

  return res.status(200).json({
    success: true,
    data: { initialDiagnosis: child.initialDiagnosis, registrationDate: child.registrationDate }
  })
}

export const updateChild = async (req, res, next) => {
  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const child = await childModel.findOneAndUpdate(
    { _id: req.params.child_id, parentId: parent._id },
    req.body,
    { new: true, runValidators: true }
  )
  if (!child) return next(new Error("child not found", { cause: 404 }))

  return res.status(200).json({ success: true, message: "child updated", data: { child } })
}