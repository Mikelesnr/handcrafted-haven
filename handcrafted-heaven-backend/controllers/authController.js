const prisma = require("../utilities/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../services/emailService");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isEmailVerified: false,
        verificationToken,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.token.create({
      data: {
        token,
        userId: user.id,
        type: "ACCESS",
        expiresAt,
      },
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await sendVerificationEmail(user);

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.isEmailVerified,
      },
      message: "Verification email sent",
    });
  } catch (err) {
    res.status(400).json({ error: "Registration failed", details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.token.create({
      data: {
        token,
        userId: user.id,
        type: "ACCESS",
        expiresAt,
      },
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.isEmailVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user)
      return res.status(404).json({ error: "Invalid or expired token" });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
      },
    });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Verification failed", details: err });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isEmailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    const newToken = crypto.randomBytes(32).toString("hex");

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken: newToken },
    });

    await sendVerificationEmail(updatedUser);

    res.json({ message: "Verification email resent" });
  } catch (err) {
    res.status(500).json({ error: "Resend failed", details: err });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ error: "No active session found" });
    }

    // Remove token from database
    await prisma.token.deleteMany({
      where: { token },
    });

    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed", details: err });
  }
};
