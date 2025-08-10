const prisma = require("../utilities/prismaClient");
const { paginate } = require("../utilities/paginate");

exports.getAllUsers = async (req, res) => {
  try {
    const { skip, limit, page } = paginate(req);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        include: {
          reviews: true,
          orders: true,
          seller: true,
        },
      }),
      prisma.user.count(),
    ]);

    res.json({
      data: users,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  const requester = req.user;

  if (!requester) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: requester.id },
      include: {
        reviews: true,
        orders: true,
        seller: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch user profile", details: err });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userId = parseInt(id);
  const requester = req.user;

  if (!requester) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const isSelf = requester.id === userId;
  const isAdmin = requester.role === "ADMIN";

  if (!isSelf && !isAdmin) {
    return res
      .status(403)
      .json({ error: "Forbidden: insufficient permissions" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const emailChanged = email && email !== existingUser.email;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        isEmailVerified: emailChanged ? false : existingUser.isEmailVerified,
      },
    });

    if (emailChanged) {
      await sendVerificationEmail(updatedUser); // 🔔 Trigger verification flow
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const userId = parseInt(id);
  const requester = req.user;

  if (!requester) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const isSelf = requester.id === userId;
  const isAdmin = requester.role === "ADMIN";

  if (!isSelf && !isAdmin) {
    return res
      .status(403)
      .json({ error: "Forbidden: insufficient permissions" });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(404)
      .json({ error: "User not found or delete failed", details: err });
  }
};
