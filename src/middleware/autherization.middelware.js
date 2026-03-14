export const authorization = (roles = []) => {
  return (req, res, next) => {
    const { user } = req
    if (!roles.includes(user.role)) {
      return next(new Error("not allowed to access this route by this role", { cause: 403 }))
    }
    return next()
  }
}
