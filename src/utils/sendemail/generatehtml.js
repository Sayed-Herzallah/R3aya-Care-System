const generateHTML = ({ userName, otp }) => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>رعاية - R3aya</title>
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; }
    .container { max-width:600px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
    .header { background:#16a34a; color:#fff; text-align:center; padding:25px; }
    .header h1 { margin:0; font-size:22px; font-weight:600; }
    .content { padding:30px; text-align:center; color:#333; }
    .otp { font-size:36px; font-weight:bold; letter-spacing:8px; color:#16a34a; margin:20px 0; padding:15px; background:#f0fdf4; border-radius:8px; }
    .footer { background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>🌿 رعاية R3aya</h1></div>
    <div class="content">
      <p>مرحباً <strong>${userName}</strong>،</p>
      <p>كود التحقق الخاص بك:</p>
      <div class="otp">${otp}</div>
      <p>صالح لمدة <strong>10 دقائق</strong> فقط.</p>
      <p>إذا لم تطلب هذا الكود، يمكنك تجاهل هذا البريد.</p>
    </div>
    <div class="footer"><p>© 2025 رعاية R3aya — جميع الحقوق محفوظة</p></div>
  </div>
</body>
</html>`
}

export default generateHTML
