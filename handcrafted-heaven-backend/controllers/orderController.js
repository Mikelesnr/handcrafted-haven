const prisma = require("../utilities/prismaClient");

exports.createOrder = async (req, res, next) => {
  const { buyerId, items } = req.body;

  if (!buyerId || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Missing buyer or valid order items" });
  }
  try {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log(
      "Creating order for buyer:",
      buyerId,
      "with items:",
      items,
      "total amount:",
      totalAmount
    );
    const newOrder = await prisma.order.create({
      data: {
        buyerId,
        totalAmount,
        status: "CONFIRMED", // or default to PENDING
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
        buyer: true,
      },
    });

    console.log("Order created successfully:", newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Prisma Order creation failed:", err);
    next(err); // This will now work
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: userId },
      include: {
        buyer: true,
        items: { include: { product: true } },
        payment: true,
      },
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving orders" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        buyer: true,
        items: { include: { product: true } },
        payment: true,
      },
    });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        buyer: true,
        items: { include: { product: true } },
        payment: true,
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving order" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Status update failed", details: err });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "Delete failed", details: err });
  }
};
