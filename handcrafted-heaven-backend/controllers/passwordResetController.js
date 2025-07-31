const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendResetPasswordEmail } = require("../services/emailService");

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: "We couldn't find an account with that email.",
        suggestion:
          "Please double-check your address or sign up if you're new.",
        supportLink: "/support/reset-help", // Optional: use if you build a support page
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes from now

    await prisma.token.create({
      data: {
        token,
        type: "EMAIL_RESET",
        expiresAt,
        userId: user.id,
      },
    });

    await sendResetPasswordEmail({
      email: user.email,
      name: user.name,
      token,
    });

    return res.status(200).json({
      message: "Password reset email sent.",
      expiresInMinutes: 30,
    });
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).json({
      error: "Reset request failed due to a server issue.",
      details: err.message || "Unexpected error.",
    });
  }
};

exports.verifyResetToken = async (req, res) => {
  const { token } = req.query;

  try {
    const found = await prisma.token.findFirst({
      where: {
        token,
        type: "EMAIL_RESET",
        expiresAt: { gt: new Date() },
      },
      include: {
        user: true, // Assuming your token has a relation to the user
      },
    });

    if (!found || !found.user)
      return res.status(400).json({ error: "Invalid or expired token" });

    const username = encodeURIComponent(found.user.name); // Or use email, firstName, etc.

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}&name=${username}`
    );
  } catch (err) {
    res.status(500).json({ error: "Verification failed", details: err });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  try {
    const found = await prisma.token.findFirst({
      where: {
        token,
        type: "EMAIL_RESET",
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!found)
      return res.status(400).json({ error: "Token is invalid or expired" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: found.user.id },
      data: { password: hashed },
    });

    await prisma.token.delete({ where: { id: found.id } });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Reset failed", details: err });
  }
};
