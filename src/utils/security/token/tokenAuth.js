import jsonwebtoken from "jsonwebtoken"

export const generateToken = ({ payload, secretToken = process.env.JWT_SECRET, options = {} }) => {
  return jsonwebtoken.sign(payload, secretToken, options)
}

export const verifyToken = ({ token, secretToken = process.env.JWT_SECRET }) => {
  return jsonwebtoken.verify(token, secretToken)
}
