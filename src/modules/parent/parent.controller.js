import { Router } from "express"
import * as parentServices    from "./parent.services.js"
import * as parentValidation  from "./parent.validation.js"
import { validation }         from "../../middleware/validation.middelware.js"
import { asyncHandler }       from "../../utils/errorhandler/asynchandler.js"
import authentication         from "../../middleware/authentication.middelware.js"
import { authorization }      from "../../middleware/autherization.middelware.js"
import { parentEndpoined }    from "./parent.endpoined.js"

const router = Router()

router.get("/",authentication, authorization(parentEndpoined.getProfile),asyncHandler(parentServices.getProfile))
router.patch("/",authentication, authorization(parentEndpoined.updateProfile), validation(parentValidation.updateProfileSchema), asyncHandler(parentServices.updateProfile))
router.delete("/",authentication, authorization(parentEndpoined.deleteAccount), asyncHandler(parentServices.deleteAccount))

export default router