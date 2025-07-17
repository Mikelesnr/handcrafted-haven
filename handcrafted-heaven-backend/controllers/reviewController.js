const prisma = require("../utilities/prismaClient");

exports.createReview = async (req, res) => {
  const { rating, comment, productId, userId } = req.body;
  try {
    const review = await prisma.review.create({
      data: { rating, comment, productId, userId },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: "Review failed", details: err });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const updated = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { rating, comment },
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: "Review update failed", details: err });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(404).json({ error: "Delete failed", details: err });
  }
};
