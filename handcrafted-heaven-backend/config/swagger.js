require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  swagger: "2.0",
  info: {
    title: "Handcrafted Haven API",
    description:
      "Auto-generated documentation for the artisan marketplace backend",
    version: "1.0.0",
  },
  host: process.env.HOST?.replace(/^https?:\/\//, "") || "localhost:5000/api",
  schemes: [process.env.SCHEME || "http"],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter JWT token in format: Bearer <your_token>",
    },
  },

  security: [{ BearerAuth: [] }],

  tags: [
    { name: "Auth", description: "Registration, login, email verification" },
    { name: "Users", description: "User management and roles" },
    { name: "Sellers", description: "Seller bios, linked products" },
    { name: "Products", description: "Marketplace listings" },
    { name: "Reviews", description: "Product feedback from customers" },
    { name: "Orders", description: "Customer order flows and statuses" },
    { name: "Payments", description: "Transactions and payment tracking" },
  ],

  definitions: {
    User: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "john@example.com" },
        password: { type: "string", example: "hashed_password" },
        role: {
          type: "string",
          enum: ["ADMIN", "SELLER", "CUSTOMER"],
          example: "SELLER",
        },
        isEmailVerified: { type: "boolean", example: true },
        verificationToken: { type: "string", nullable: true, example: null },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-17T14:00:00Z",
        },
      },
    },
    Seller: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        userId: { type: "integer", example: 1 },
        bio: { type: "string", example: "Artisan specializing in ceramics" },
        imageUrl: {
          type: "string",
          example: "https://example.com/images/amy.png",
        },
      },
    },
    Product: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        title: { type: "string", example: "Handmade Clay Bowl" },
        description: {
          type: "string",
          example: "Crafted with traditional techniques",
        },
        price: { type: "number", example: 29.99 },
        imageUrl: {
          type: "string",
          example: "https://example.com/images/bowl.png",
        },
        category: { type: "string", example: "Ceramics" },
        sellerId: { type: "integer", example: 1 },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-17T14:00:00Z",
        },
      },
    },
    Review: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        rating: { type: "integer", example: 5 },
        comment: { type: "string", example: "Beautifully made!" },
        productId: { type: "integer", example: 1 },
        userId: { type: "integer", example: 3 },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-17T14:00:00Z",
        },
      },
    },
    Order: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        buyerId: { type: "integer", example: 3 },
        status: {
          type: "string",
          enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
          example: "CONFIRMED",
        },
        totalAmount: { type: "number", example: 29.99 },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-17T14:00:00Z",
        },
      },
    },
    OrderItem: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        orderId: { type: "integer", example: 1 },
        productId: { type: "integer", example: 1 },
        quantity: { type: "integer", example: 1 },
        price: { type: "number", example: 29.99 },
      },
    },
    Payment: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        orderId: { type: "integer", example: 1 },
        method: { type: "string", example: "card" },
        status: {
          type: "string",
          enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
          example: "COMPLETED",
        },
        transactionId: { type: "string", example: "TXN123456" },
        paidAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-17T14:02:00Z",
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("📘 Swagger documentation generated successfully");
  process.exit(); // ensure clean exit
});
