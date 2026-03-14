import { Router } from "express"
import * as authServices from "./auth.services.js"
import { validation } from "../../middleware/validation.middelware.js"
import * as authValidation from "./auth.validation.js"
import { asyncHandler } from "../../utils/errorhandler/asynchandler.js"
import authentication from "../../middleware/authentication.middelware.js"

const router = Router()

// ─── Public Routes ─────────────────────────────────────────────────────────────
router.post("/register",validation(authValidation.registerSchema),asyncHandler(authServices.registerUser))
router.post("/login",validation(authValidation.loginSchema),asyncHandler(authServices.loginUser))
router.patch("/verify",validation(authValidation.verifyEmailSchema),asyncHandler(authServices.verifyEmail))
router.post("/forgetPassword",validation(authValidation.forgetPasswordSchema),asyncHandler(authServices.frogetPassword))
router.patch("/resetPassword",validation(authValidation.resetPasswordSchema), asyncHandler(authServices.resetPassword))

// ─── Protected Routes ──────────────────────────────────────────────────────────
router.get("/profile", authentication, asyncHandler(authServices.getProfile))
router.patch("/profile", authentication, validation(authValidation.updateProfileSchema), asyncHandler(authServices.updateProfile))

export default router