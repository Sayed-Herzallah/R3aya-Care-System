import express from "express"
import dotenv from "dotenv"
import { bootstrap } from "./app.controller.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

await bootstrap(app, express)

app.listen(port, () => {
  console.log(`🚀 R3aya server running on port ${port}`)
})
