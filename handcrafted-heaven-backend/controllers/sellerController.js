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
    res.status(500).json({ error: "Error fetching seller" });
  }
};

exports.updateSeller = async (req, res) => {
  const { id } = req.params;
  const { bio, imageUrl } = req.body;
  try {
    const updated = await prisma.seller.update({
      where: { id: parseInt(id) },
      data: { bio, imageUrl },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err });
  }
};

exports.deleteSeller = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.seller.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Seller deleted" });
  } catch (err) {
    res.status(404).json({ error: "Delete failed", details: err });
  }
};
