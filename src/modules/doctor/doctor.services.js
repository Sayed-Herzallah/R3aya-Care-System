import { doctorModel } from "../../database/models/doctor.model.js"
import { sendEmails }  from "../../utils/sendemail/sendEmail.js"

export const getAllDoctors = async (req, res, next) => {
  const doctors = await doctorModel.find({}, "name specialty phone email averageRating isOnline")
  return res.status(200).json({ success: true, data: { doctors } })
}

export const getDoctorById = async (req, res, next) => {
  const doctor = await doctorModel.findById(req.params.doctor_id)
  if (!doctor) return next(new Error("doctor not found", { cause: 404 }))
  return res.status(200).json({ success: true, data: { doctor } })
}

export const rateDoctor = async (req, res, next) => {
  const doctor = await doctorModel.findById(req.params.doctor_id)
  if (!doctor) return next(new Error("doctor not found", { cause: 404 }))

  doctor.ratings = doctor.ratings.filter(r => r.user?.toString() !== req.user._id.toString())
  doctor.ratings.push({ user: req.user._id, stars: req.body.stars })
  await doctor.save()

  return res.status(200).json({ success: true, message: "rating submitted", data: { averageRating: doctor.averageRating } })
}

export const contactDoctor = async (req, res, next) => {
  const doctor = await doctorModel.findById(req.params.doctor_id)
  if (!doctor) return next(new Error("doctor not found", { cause: 404 }))

  await sendEmails({
    to:      doctor.email,
    subject: "رسالة تواصل جديدة",
    html: `<h3>رسالة من ولي أمر</h3>
           <p><b>الاسم:</b> ${req.user.userName}</p>
           <p><b>البريد:</b> ${req.user.email}</p>
           <p><b>الرسالة:</b> ${req.body.message || "يرجى التواصل معي."}</p>`
  })

  return res.status(200).json({ success: true, message: "message sent to doctor" })
}