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
const adminRoutes = require("./admin.routes"); // #swagger.tags = ['Admin']
const homeController = require("../controllers/homeController.js");

router.get("/", homeController.getHome);

router.use("/api/users", userRoutes);
router.use("/api/sellers", sellerRoutes);
router.use("/api/products", productRoutes);
router.use("/api/reviews", reviewRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/payments", paymentRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/admin", adminRoutes);

module.exports = router;
