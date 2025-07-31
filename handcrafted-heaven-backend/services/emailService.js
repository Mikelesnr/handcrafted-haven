const transporter = require("../utilities/mailer");

exports.sendVerificationEmail = async (user) => {
  const mailOptions = {
    from: `"Handcrafted Haven" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Verify Your Email",
    html: `
      <p>Hi ${user.name},</p>
      <p>Thank you for registering. Please click the link below to verify your email:</p>
      <p><a href="${process.env.PUBLIC_URL}/api/auth/verify/${user.verificationToken}">Verify Email</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendResetPasswordEmail = async ({ email, name, token }) => {
  const resetUrl = `${process.env.PUBLIC_URL}/api/auth/verify-reset-token?token=${token}`;
  const mailOptions = {
    from: `"Handcrafted Haven" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the link below to continue:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link will expire in 30 minutes.</p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
