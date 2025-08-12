const prisma = require("../utilities/prismaClient");
const { paginate } = require("../utilities/paginate");

exports.createProduct = async (req, res) => {
  const { title, description, price, imageUrl, category, sellerId } = req.body;

  try {
    // 🔍 Step 1: Check if category exists
    let existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    // 🛠️ Step 2: Create category if it doesn't exist
    if (!existingCategory) {
      existingCategory = await prisma.category.create({
        data: { name: category },
      });
    }

    // 🧱 Step 3: Create product with resolved categoryId
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        sellerId,
        categoryId: existingCategory.id,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Product creation failed", details: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { skip, limit, page } = paginate(req);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        include: {
          seller: true,
          reviews: true,
          category: true, // ✅ Attach category info
        },
      }),
      prisma.product.count(),
    ]);

    res.json({
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching products", details: err });
  }
};

// controllers/productController.ts
exports.getFilteredProducts = async (req, res) => {
  try {
    const { skip, limit, page } = paginate(req);
    const { category } = req.query;

    const whereClause =
      category && category !== "all" ? { category: { name: category } } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          seller: true,
          reviews: true,
          category: true,
        },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    res.json({
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ error: "Error filtering products", details: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, category } = req.body;

  try {
    const updated = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price,
        imageUrl,
        category: {
          connect: { id: category }, // ✅ Connect to existing category by ID
        },
      },
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }, // optional sorting
    });

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
