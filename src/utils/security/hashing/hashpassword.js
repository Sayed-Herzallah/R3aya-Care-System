import bcrypt from "bcrypt"

export const hashPassword = ({ plainText, salt = Number(process.env.ROUNDS) }) => {
  return bcrypt.hashSync(plainText, salt)
}

export const verifyPassword = ({ plainText, hash }) => {
  return bcrypt.compareSync(plainText, hash)
}
