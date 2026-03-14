import connectDB from "./src/database/connect.db.js"
import cors from "cors"
import { notFoundHandler } from "./src/utils/errorhandler/not.found.handler.js"
import { globalErrorHandler } from "./src/utils/errorhandler/global.error.handler.js"
import authRouter from "./src/modules/auth/auth.controller.js"
import childRouter from "./src/modules/child/child.controller.js"
import sessionRouter from "./src/modules/session/session.controller.js"
import doctorRouter from "./src/modules/doctor/doctor.controller.js"
import emgRouter from "./src/modules/emg/emg.controller.js"
import exerciseRouter from "./src/modules/exercise/exercise.controller.js"
import notificationRouter from "./src/modules/notification/notification.controller.js"
import settingsRouter from "./src/modules/settings/settings.controller.js"

export const bootstrap = async (app, express) => {

  // ==================== Read Body ====================
  app.use(express.json())


  // ==================== CORS ====================
  app.use(cors())

  // ==================== Connect DB ====================
  await connectDB()

  // ==================== Health Check ====================
  app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "🌿 R3aya API is running", version: "1.0.0" })
  })

  // ==================== Routers ====================
  app.use("/auth",          authRouter)
  app.use("/children",      childRouter)
  app.use("/children",      emgRouter)    // ✅ GET /children/:child_id/emg  (matches PDF)
  app.use("/sessions",      sessionRouter)
  app.use("/doctors",       doctorRouter)
  app.use("/emg",           emgRouter)    // POST /emg/start  POST /emg/stop
  app.use("/exercises",     exerciseRouter)
  app.use("/notifications", notificationRouter)
  app.use("/settings",      settingsRouter)

  // ==================== Not Found ====================
  app.all("*", notFoundHandler)

  // ==================== Global Error Handler ====================
  app.use(globalErrorHandler)
}
