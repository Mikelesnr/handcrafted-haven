const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const PASSWORD = "Test1234#";

async function main() {
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  // 🧑‍💼 Admin
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@hhaven.com",
      password: hashedPassword,
      role: "ADMIN",
      isEmailVerified: true,
    },
  });

  // 🧑‍🎨 Seller
  const sellerUser = await prisma.user.create({
    data: {
      name: "Artisan Amy",
      email: "amy@hhaven.com",
      password: hashedPassword,
      role: "SELLER",
      isEmailVerified: true,
    },
  });

  const sellerProfile = await prisma.seller.create({
    data: {
      userId: sellerUser.id,
      bio: "Crafts ceramics with a rustic charm.",
      imageUrl: "https://example.com/sellers/amy.png",
    },
  });

  const product = await prisma.product.create({
    data: {
      title: "Rustic Clay Bowl",
      description: "Hand-molded from local clay using eco-friendly methods.",
      price: 45.0,
      imageUrl: "https://example.com/products/bowl.png",
      category: "Ceramics",
      sellerId: sellerProfile.id,
    },
  });

  // 🛍️ Customer
  const customer = await prisma.user.create({
    data: {
      name: "Buyer Ben",
      email: "ben@hhaven.com",
      password: hashedPassword,
      role: "CUSTOMER",
      isEmailVerified: true,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Absolutely stunning piece, even better in person!",
      productId: product.id,
      userId: customer.id,
    },
  });

  const order = await prisma.order.create({
    data: {
      buyerId: customer.id,
      status: "CONFIRMED",
      totalAmount: product.price,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      price: product.price,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,
      method: "card",
      status: "COMPLETED",
      transactionId: "TXN_TEST_001",
      paidAt: new Date(),
    },
  });

  console.log(
    "✅ Seed complete — 3 users, 1 product, 1 order with review and payment"
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
