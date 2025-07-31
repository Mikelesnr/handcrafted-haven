// utilities/middleware.js
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const protect = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const storedToken = await prisma.token.findFirst({
      where: {
        token,
        type: "ACCESS",
      },
      include: { user: true },
    });

    if (!storedToken) {
      return res
        .status(403)
        .json({ error: "Token not recognized or not of access type" });
    }

    if (new Date(storedToken.expiresAt) < new Date()) {
      return res.status(403).json({ error: "Token has expired" });
    }

    req.user = storedToken.user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { protect };
