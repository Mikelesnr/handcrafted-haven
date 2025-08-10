require("dotenv").config();

const PUBLIC_URL = process.env.PUBLIC_URL;

exports.getHome = (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Handcrafted Heaven API</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f9f9f9;
          color: #333;
          padding: 2rem;
          max-width: 800px;
          margin: auto;
        }
        h1 {
          color: #2c3e50;
        }
        a {
          color: #0077cc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .section {
          margin-bottom: 2rem;
        }
        .badge {
          display: inline-block;
          background-color: #e0e0e0;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-right: 0.5rem;
        }
      </style>
    </head>
    <body>
      <h1>🌟 Welcome to the Handcrafted Heaven API</h1>
      <p>This is the backend service for <strong>Handcrafted Haven</strong>, a full-stack marketplace for unique handcrafted items.</p>

      <div class="section">
        <h2>📌 Project Overview</h2>
        <p>Built as a university project for <em>WDD 430: Web Full-Stack Development</em> at BYU–Idaho, this API powers a platform that connects artisans with mindful consumers.</p>
        <p>It supports:</p>
        <ul>
          <li>🧠 Full-stack development practice</li>
          <li>🤝 Team collaboration</li>
          <li>🧑‍🏫 "Teach One Another" principle</li>
        </ul>
      </div>

      <div class="section">
        <h2>✨ Features</h2>
        <ul>
          <li>Seller Profiles with bios and product lists</li>
          <li>Product Listings with categories, pricing, and images</li>
          <li>User Reviews & Ratings</li>
          <li>Responsive Design & Accessibility</li>
        </ul>
      </div>

      <div class="section">
        <h2>🛠️ Tech Stack</h2>
        <p>
          <span class="badge">Frontend: Next.js</span>
          <span class="badge">Backend: Node.js + Express</span>
          <span class="badge">Database: Prisma</span>
          <span class="badge">Deployment: Vercel & Render</span>
        </p>
      </div>

      <div class="section">
        <h2>📘 API Documentation</h2>
        <p>Explore the full Swagger docs <a href="${PUBLIC_URL}/api-docs" target="_blank">here</a>.</p>
      </div>

      <footer>
        <p>Made by Michael Mwanza, Moshoeshoe Simon Mopeli, and Tinny Mosimanyana.</p>
        <p>&copy; ${new Date().getFullYear()} Handcrafted Haven</p>
      </footer>
    </body>
    </html>
  `);
};
