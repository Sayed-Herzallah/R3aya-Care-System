import { Router } from "express"
import * as doctorServices from "./doctor.services.js"
import * as doctorValidation from "./doctor.validation.js"
import { validation } from "../../middleware/validation.middelware.js"
import { asyncHandler } from "../../utils/errorhandler/asynchandler.js"
import authentication from "../../middleware/authentication.middelware.js"
import { authorization } from "../../middleware/autherization.middelware.js"
import { doctorEndpoined } from "./doctor.endpoined.js"

const router = Router()

router.get("/", authentication, authorization(doctorEndpoined.getAllDoctors), asyncHandler(doctorServices.getAllDoctors))
router.get("/:doctor_id", authentication, authorization(doctorEndpoined.getDoctor), validation(doctorValidation.doctorIdSchema), asyncHandler(doctorServices.getDoctorById))
router.post("/:doctor_id/rate", authentication, authorization(doctorEndpoined.rateDoctor), validation(doctorValidation.rateSchema), asyncHandler(doctorServices.rateDoctor))
router.post("/:doctor_id/contact", authentication, authorization(doctorEndpoined.contactDoctor), validation(doctorValidation.contactSchema), asyncHandler(doctorServices.contactDoctor))

export default router
