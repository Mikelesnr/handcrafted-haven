const prisma = require("../utilities/prismaClient");

exports.createProduct = async (req, res) => {
  const { title, description, price, imageUrl, category, sellerId } = req.body;
  try {
    const product = await prisma.product.create({
      data: { title, description, price, imageUrl, category, sellerId },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Product creation failed", details: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { seller: true, reviews: true },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, category } = req.body;
  try {
    const updated = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { title, description, price, imageUrl, category },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Product update failed", details: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(404).json({ error: "Deletion failed", details: err });
  }
};
