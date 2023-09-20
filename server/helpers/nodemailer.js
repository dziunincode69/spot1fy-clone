const mailer = require("nodemailer");
require("dotenv").config();

function sendVerification(email, token) {
  const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const options = {
    from: "SpotiWeb@mail.manesty.wtf",
    sender: "postmaster@mail.manesty.wtf",
    to: email,
    subject: "SpotiWeb Verification Register",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .container {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .code {
            text-align: center;
            margin: 20px 0;
        }
        .verify-button {
            font-weight: bold;
            font-size: 24px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }
        .verify-button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Dear User,</p>
        <p>Thank you for registering with us! Please click the button below to complete your registration:</p>
        <div class="code">
            <a href="${process.env.BASE_URL}/verify?token=${token}" class="verify-button">Verify Email</a>
        </div>
        <p>If you did not request this verification, please ignore this email.</p>
        <p>Warm regards,<br>SpotiWeb</p>
    </div>
</body>
</html>

`,
  };
  try {
    const send = transporter.sendMail(options);
    console.log(send);
    return send;
  } catch (error) {}
}

module.exports = sendVerification;
