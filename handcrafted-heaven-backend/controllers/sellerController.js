const prisma = require("../utilities/prismaClient");

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({
      include: { user: true, products: true },
    });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
};

exports.getSellerById = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await prisma.seller.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, products: true },
    });
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching seller", details: err.message });
  }
};

exports.getAuthenticatedSeller = async (req, res) => {
  try {
    const seller = await prisma.seller.findFirst({
      where: { userId: req.user.id },
      include: { user: true, products: true },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(seller); // ✅ Same response format
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching seller", details: err.message });
  }
};

exports.createSeller = async (req, res) => {
  const { bio, imageUrl } = req.body;
  const userId = req.user.id;

  try {
    // Check if seller already exists
    const existing = await prisma.seller.findUnique({ where: { userId } });
    if (existing) {
      return res.status(400).json({ error: "Seller profile already exists" });
    }

    const newSeller = await prisma.seller.create({
      data: {
        bio,
        imageUrl,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ error: "Creation failed", details: err.message });
  }
};

exports.updateSeller = async (req, res) => {
  const { id } = req.params;
  const { bio, imageUrl } = req.body;

  try {
    const seller = await prisma.seller.findUnique({
      where: { id: parseInt(id) },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Optional: ensure user owns this seller profile
    if (seller.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile" });
    }

    const updated = await prisma.seller.update({
      where: { id: parseInt(id) },
      data: { bio, imageUrl },
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err.message });
  }
};

exports.deleteSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await prisma.seller.findUnique({
      where: { id: parseInt(id) },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    if (seller.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this profile" });
    }

    await prisma.seller.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Seller deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed", details: err.message });
  }
};
