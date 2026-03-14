import CryptoJS from "crypto-js"

export const encryptPhone = ({ plainText }) => {
  return CryptoJS.AES.encrypt(plainText, process.env.ENCRYPT_KEY).toString()
}

export const decryptPhone = ({ cipherText }) => {
  return CryptoJS.AES.decrypt(cipherText, process.env.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8)
}
