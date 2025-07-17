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
