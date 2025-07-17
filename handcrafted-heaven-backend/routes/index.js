const express = require("express");
const router = express.Router();

/* 
  #swagger.autoBody = false
  #swagger.tags = ['Router']
  #swagger.description = 'Index route file registering all modular subroutes'
  #swagger.responses[200] = {
    description: 'Successfully mapped route collections',
  }
*/

const userRoutes = require("./user.routes"); // #swagger.tags = ['Users']
const sellerRoutes = require("./seller.routes"); // #swagger.tags = ['Sellers']
const productRoutes = require("./product.routes"); // #swagger.tags = ['Products']
const reviewRoutes = require("./review.routes"); // #swagger.tags = ['Reviews']
const orderRoutes = require("./order.routes"); // #swagger.tags = ['Orders']
const paymentRoutes = require("./payment.routes"); // #swagger.tags = ['Payments']
const authRoutes = require("./auth.routes"); // #swagger.tags = ['Auth']

router.use("/users", userRoutes);
router.use("/sellers", sellerRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/auth", authRoutes);

module.exports = router;
