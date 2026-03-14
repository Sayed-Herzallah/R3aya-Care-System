import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_URL)
    console.log("✅ success connect DataBase")
  } catch (error) {
    console.error("❌ failed connect DataBase:", error.message)
  }
}

export default connectDB
