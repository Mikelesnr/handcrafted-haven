const prisma = require("../utilities/prismaClient");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { order: true },
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
};

exports.createPayment = async (req, res, next) => {
  const { orderId, method, status, transactionId } = req.body;
  console.log(
    "Creating payment for order:",
    orderId,
    "with method:",
    method,
    "status:",
    status,
    "transactionId:",
    transactionId
  );
  try {
    const payment = await prisma.payment.create({
      data: {
        orderId,
        method,
        status,
        transactionId,
        paidAt: new Date(),
      },
    });
    res.status(201).json(payment);
  } catch (err) {
    console.error("Prisma Payment creation failed:", err);
    res.status(400).json({ error: "Payment failed", details: err });
    next(err);
  }
};

exports.updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Status update failed", details: err });
  }
};

exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.payment.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(404).json({ error: "Delete failed", details: err });
  }
};
