const prisma = require("../database/db");

// Get all users with optional pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        include: {
          seller: true,
          orders: true,
          reviews: true,
          Image: true,
        },
        orderBy: { createdAt: "desc" },
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
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        seller: true,
        orders: true,
        reviews: true,
        Image: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update user role or verification status
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, isEmailVerified } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(role && { role }),
        ...(typeof isEmailVerified === "boolean" && { isEmailVerified }),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ error: "User update failed", details: err });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Step 1: Check and delete reviews
    const reviewCount = await prisma.review.count({ where: { userId } });
    if (reviewCount > 0) {
      await prisma.review.deleteMany({ where: { userId } });
    }

    // Step 2: Check and delete seller profile
    const sellerCount = await prisma.seller.count({ where: { userId } });
    if (sellerCount > 0) {
      await prisma.seller.deleteMany({ where: { userId } });
    }

    // Step 3: Check and delete orders
    const orderCount = await prisma.order.count({ where: { buyerId: userId } });
    if (orderCount > 0) {
      await prisma.order.deleteMany({ where: { buyerId: userId } });
    }

    // Step 4: Check and delete tokens
    const tokenCount = await prisma.token.count({ where: { userId } });
    if (tokenCount > 0) {
      await prisma.token.deleteMany({ where: { userId } });
    }

    // Final Step: Delete the user
    await prisma.user.delete({ where: { id: userId } });

    return res
      .status(200)
      .json({ message: "User and related records deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(500).json({ error: "Deletion failed", details: error });
  }
};

// Admin dashboard metrics
exports.getUserStats = async (req, res) => {
  try {
    const [totalUsers, totalSellers, totalCustomers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "SELLER" } }),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
    ]);

    res.json({
      totalUsers,
      totalSellers,
      totalCustomers,
    });
  } catch (err) {
    console.error("Error fetching user stats:", err);
    res.status(500).json({ error: "Failed to fetch user statistics" });
  }
};
