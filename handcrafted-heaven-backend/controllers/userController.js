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

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await require("bcrypt").hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isEmailVerified: true, // optional: auto-verify or pending
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "User creation failed", details: err });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, isEmailVerified } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        role,
        isEmailVerified,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    res
      .status(404)
      .json({ error: "User not found or update failed", details: err });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(404)
      .json({ error: "User not found or delete failed", details: err });
  }
};
