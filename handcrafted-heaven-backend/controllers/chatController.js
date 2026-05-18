const { GoogleGenAI } = require("@google/genai");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Initialize Gemini using your environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleMarketplaceChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // A. Query top 3 highest-rated products
    const topRatedAggregates = await prisma.review.groupBy({
      by: ["productId"],
      _avg: { rating: true },
      orderBy: { _avg: { rating: "desc" } },
      take: 3,
    });

    const topRatedProducts = await prisma.product.findMany({
      where: { id: { in: topRatedAggregates.map((a) => a.productId) } },
      include: { seller: { include: { user: true } } },
    });

    // B. Query top 3 trending products by total order volume
    const popularAggregates = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 3,
    });

    const popularProducts = await prisma.product.findMany({
      where: { id: { in: popularAggregates.map((p) => p.productId) } },
    });

    // C. Pull general catalog context (titles, descriptions, prices)
    const fullCatalog = await prisma.product.findMany({
      include: {
        category: true,
        seller: { include: { user: true } },
      },
      take: 25,
    });

    // Construct the live system context instructions
    const systemInstruction = `
You are "Haven Guide," the official AI assistant for Handcrafted Haven, a multi-vendor craft marketplace.
You have direct access to real-time database snapshots to answer inquiries perfectly.

LIVE DATA SNAPSHOT:
---
HIGHEST RATED:
${topRatedProducts
  .map((p) => {
    const avg =
      topRatedAggregates.find((a) => a.productId === p.id)?._avg?.rating || 0;
    return `- "${p.title}" by Artisan ${p.seller.user.name} (${Number(avg).toFixed(1)}/5 Stars)`;
  })
  .join("\n")}

---
TRENDING / POPULAR:
${popularProducts
  .map((p) => {
    const units =
      popularAggregates.find((a) => a.productId === p.id)?._sum?.quantity || 0;
    return `- "${p.title}" ($${p.price}) [Total units sold: ${units}]`;
  })
  .join("\n")}

---
AVAILABLE INVENTORY & DESCRIPTIONS:
${fullCatalog
  .map(
    (p) => `
- Item: "${p.title}"
  Price: $${p.price}
  Shop Owner: ${p.seller.user.name}
  Description: ${p.description}
`,
  )
  .join("\n")}
---

INSTRUCTIONS:
- Guide buyers using the exact catalog information above.
- If an item is highly rated or popular, explicitly mention it when asked for recommendations.
- Keep your tone warm, welcoming, and community-centric.
- If a user asks about an item not listed in the snapshot, let them know it's not currently in stock.
`;

    // Execute generation using Gemini 1.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("Gemini AI Agent Error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error running chat agent." });
  }
};

module.exports = {
  handleMarketplaceChat,
};
