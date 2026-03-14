import { emgModel }   from "../../database/models/emg.model.js"
import { childModel } from "../../database/models/child.model.js"
import { parentModel } from "../../database/models/parent.model.js"

const getParent = async (userId) => parentModel.findOne({ userId })

export const startEMG = async (req, res, next) => {
  const { child_id, muscleType, doctor_id } = req.body

  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const child = await childModel.findOne({ _id: child_id, parentId: parent._id })
  if (!child) return next(new Error("child not found", { cause: 404 }))

  const emg = await emgModel.create({
    childId:  child_id,
    doctorId: doctor_id,
    muscleType,
    status: "recording"
  })

  return res.status(201).json({
    success: true,
    message: "EMG started",
    data: { emgId: emg._id, startedAt: emg.measurementDate }
  })
}

export const stopEMG = async (req, res, next) => {
  const { emg_id, waveformData, duration, signalValue, aiModelResult } = req.body

  const emg = await emgModel.findById(emg_id)
  if (!emg)                       return next(new Error("EMG not found",    { cause: 404 }))
  if (emg.status !== "recording") return next(new Error("EMG not recording", { cause: 400 }))

  emg.waveformData  = waveformData || []
  emg.duration      = duration
  emg.signalValue   = signalValue
  emg.aiModelResult = aiModelResult
  emg.status        = "completed"
  await emg.save()

  return res.status(200).json({ success: true, message: "EMG saved", data: { emg } })
}

export const getChildEMG = async (req, res, next) => {
  const { child_id }             = req.params
  const { page = 1, limit = 10 } = req.query

  const parent = await getParent(req.user._id)
  if (!parent) return next(new Error("parent not found", { cause: 404 }))

  const child = await childModel.findOne({ _id: child_id, parentId: parent._id })
  if (!child) return next(new Error("child not found", { cause: 404 }))

  const skip    = (page - 1) * limit
  const total   = await emgModel.countDocuments({ childId: child_id, status: "completed" })
  const records = await emgModel
    .find({ childId: child_id, status: "completed" })
    .populate("doctorId", "name specialty")
    .sort({ measurementDate: -1 })
    .skip(skip)
    .limit(Number(limit))

  return res.status(200).json({
    success: true,
    data: { records },
    meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) }
  })
}