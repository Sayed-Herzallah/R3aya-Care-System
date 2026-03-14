import { userModel } from "../database/models/user.model.js"
import { verifyToken } from "../utils/security/token/tokenAuth.js"

const authentication = async (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) return next(new Error("not authenticated", { cause: 401 }))

  const payload = verifyToken({ token })
  if (!payload?.id) return next(new Error("invalid token", { cause: 401 }))

  const user = await userModel.findById(payload.id).lean()
  if (!user)            return next(new Error("user not found", { cause: 404 }))
  if (user.isDeleted)   return next(new Error("account deleted", { cause: 403 }))

  req.user = user
  return next()
}

export default authentication