import nodemailer from "nodemailer"

export const sendEmails = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_GOOGLE,
      pass: process.env.PASS_GOOGLE
    }
  })

  await transporter.sendMail({
    from: `"رعاية R3aya" <${process.env.EMAIL_GOOGLE}>`,
    to,
    subject,
    html
  })
}

export const subject = {
  forgetPassword: "إعادة تعيين كلمة المرور - رعاية",
  verifyEmail:    "تفعيل حسابك في رعاية"
}
