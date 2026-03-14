import { Router } from "express"
import * as emgServices from "./emg.services.js"
import * as emgValidation from "./emg.validation.js"
import { validation } from "../../middleware/validation.middelware.js"
import { asyncHandler } from "../../utils/errorhandler/asynchandler.js"
import authentication from "../../middleware/authentication.middelware.js"
import { authorization } from "../../middleware/autherization.middelware.js"
import { emgEndpoined } from "./emg.endpoined.js"

const router = Router()

router.post("/start", authentication, authorization(emgEndpoined.startEMG), validation(emgValidation.startEMGSchema), asyncHandler(emgServices.startEMG))
router.post("/stop", authentication, authorization(emgEndpoined.stopEMG), validation(emgValidation.stopEMGSchema), asyncHandler(emgServices.stopEMG))

// ✅ Matches PDF: GET /children/:child_id/emg  (mounted via childRouter in app.controller)
router.get("/:child_id/emg", authentication, authorization(emgEndpoined.getChildEMG), validation(emgValidation.childEMGSchema), asyncHandler(emgServices.getChildEMG))

export default router
