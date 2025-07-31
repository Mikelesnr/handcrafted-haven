const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const users = require("./users.json");
const sellers = require("./sellers.json");
const products = require("./products.json");
const reviews = require("./reviews.json");
const orders = require("./orders.json");
const orderItems = require("./orderItems.json");
const payments = require("./payments.json");

async function main() {
  const hashedPassword = await bcrypt.hash("Test1234#", 10);

  // 🧑‍💼 Seeding User Table
  console.log("🌱 Seeding user table...");
  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
  console.log("✅ User table seeded.");

  // 🧑‍🎨 Seeding Seller Table
  console.log("🌱 Seeding seller table...");
  for (const seller of sellers) {
    await prisma.seller.create({ data: seller });
  }
  console.log("✅ Seller table seeded.");

  // 🛍️ Seeding Product Table
  console.log("🌱 Seeding product table...");
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log("✅ Product table seeded.");

  // ⭐ Seeding Review Table
  console.log("🌱 Seeding review table...");
  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }
  console.log("✅ Review table seeded.");

  // 📦 Seeding Order Table
  console.log("🌱 Seeding order table...");
  for (const order of orders) {
    await prisma.order.create({ data: order });
  }
  console.log("✅ Order table seeded.");

  // 🧾 Seeding Order Items Table
  console.log("🌱 Seeding order items table...");
  for (const item of orderItems) {
    await prisma.orderItem.create({ data: item });
  }
  console.log("✅ Order items table seeded.");

  // 💳 Seeding Payment Table
  console.log("🌱 Seeding payment table...");
  for (const payment of payments) {
    await prisma.payment.create({ data: payment });
  }
  console.log("✅ Payment table seeded.");

  console.log("🎉 All data seeded successfully.");
}

main()
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
