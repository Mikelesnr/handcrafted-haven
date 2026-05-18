# 🛍️ Handcrafted Haven

A full-stack web application designed to showcase and sell unique handcrafted items, connecting passionate artisans with mindful consumers.

**University Project for WDD 430: Web Full-Stack Development — Brigham Young University–Idaho**

---

## 📌 Project Overview

**Handcrafted Haven** is a virtual marketplace fostering sustainable consumption and community-driven creativity. It provides a platform for artisans to share their stories, promote their work, and engage with users who appreciate quality craftsmanship.

This group project supports core course goals:

- 🧠 Develop Full-Stack Software Skills
- 🤝 Collaborate Effectively as a Team
- 🧑‍🏫 Practice BYU–Idaho’s "Teach One Another" principle

---

## 🏗️ Repository Architecture

The project is split cleanly into decoupled frontend and backend workspaces within a single repository:

```text
handcrafted-haven/
├── handcrafted-heaven-backend/    # Express.js REST API + Prisma ORM
└── handcrafted-heaven-frontend/   # Next.js App Router + TypeScript + Tailwind v4

```

---

## ✨ Features

- **Seller Profiles** Authenticated sellers can create dedicated profiles with a curated product list, biography, and imagery.
- **Product Listings** Handcrafted items include descriptions, pricing, filtering by category or price range, and image uploads.
- **User Reviews & Ratings** Anyone can leave product feedback and ratings to help guide future buyers.
- **🤖 Live Bounded AI Marketplace Agent (`Haven Guide`)** An embedded, contextual AI assistant located natively in the frontend layout viewports to help users query live platform metrics, product catalogs, and top-rated items smoothly.
- **📧 Secure API-Based Transactional Mailer** An automated email system built on top of the Google API ecosystem using OAuth2 to securely send platform receipts, invoices, and registration notifications.

---

## 🎨 Design & Accessibility

- **Responsive Design** for all screen sizes (mobile, tablet, desktop)
- **WCAG 2.1 Level AA Accessibility** compliance
- **SEO & Performance Optimized**
- **Consistent Branding** with intuitive navigation and UI standards

---

## 🛠️ Tech Stack

| Layer               | Technology                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| **Frontend**        | HTML, CSS, Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide Icons |
| **Backend**         | Node.js, Express.js, PostgreSQL, Prisma ORM                                |
| **Documentation**   | Swagger UI (`swagger-autogen`)                                             |
| **AI Integrations** | `@google/genai` (Gemini 2.5 Flash) via Google Cloud API                    |
| **Mailer System**   | Google OAuth2 API Configuration                                            |
| **Deployment**      | Render (Backend Web Service), Vercel (Frontend Hosting)                    |
| **Version Control** | Git, GitHub                                                                |
| **Project Mgmt**    | GitHub Boards                                                              |

---

## 🚀 Getting Started

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Mikelesnr/handcrafted-haven.git
cd handcrafted-haven

```

---

### ⚙️ Backend Setup (`handcrafted-heaven-backend`)

#### 1. Install Dependencies

```bash
cd handcrafted-heaven-backend
npm install

```

#### 2. Configure Environment Variables

Create a `.env` file in the root of the backend folder. Both the frontend and backend directories contain a `.env.sample` file outlining all required keys. Copy the sample file to configure your local keys:

```bash
cp .env.sample .env

```

#### 3. Critical Database & Documentation Commands

Before spinning up the server, you **must** generate your Prisma client artifacts and sync your API documentation definitions.

> ⚠️ **CRITICAL PRE-RUN COMMANDS:**
> Run these scripts every time you change the database schema or controller endpoints to avoid runtime compilation crashes.

```bash
# 1. Generate the type-safe Prisma Client models
npx prisma generate

# 2. Re-build the Swagger auto-generated documentation
npm run swagger

```

#### 4. Boot the Backend Development Server

```bash
npm run dev

```

The API layer will be active and listening on `http://localhost:5000`. You can explore and execute interactive test runs against your API endpoints natively at `http://localhost:5000/api-docs`.

---

### 💻 Frontend Setup (`handcrafted-heaven-frontend`)

#### 1. Install Dependencies

```bash
cd ../handcrafted-heaven-frontend
npm install

```

#### 2. Configure Environment Variables

Create a `.env` file in the root of the frontend folder by duplicating the sample template:

```bash
cp .env.sample .env

```

#### 3. Boot the Next.js Workspace

```bash
npm run dev

```

Open your browser to `http://localhost:3000` to interact with the marketplace storefront.

---

## 🌟 Deep-Dive Feature Implementations

### 🤖 Live Bounded AI Marketplace Agent (`Haven Guide`)

- **Purpose:** Built strictly to provide product information and help customers actively navigate available crafts, reviews, and seller profiles.
- **Context Harvesting:** When a customer interacts with the agent, the backend intercepts the prompt, executes real-time relational aggregations via Prisma (e.g., top-rated items, review counts, order frequency arrays), and streams this raw contextual text catalog straight into Google's `gemini-2.5-flash` model.
- **Hallucination Protection:** Strict system instructions lock the AI's boundaries exclusively to your active database state. If an item or craft category isn't present in your current inventory, the bot cleanly handles the boundary limitation without hallucinating false vendor data.

### 📧 API-Driven OAuth2 Transactional Mailer (Render Deployment Fix)

- **Purpose:** Dedicated purely to dispatching system transactional notifications (registration confirmations, vendor notifications, receipts).
- **The Render SMTP Port Block Problem:** Traditional email configurations rely on raw SMTP transport setups using libraries like `Nodemailer` over TCP ports like `25`, `465`, or `587`. However, modern cloud environments like **Render's free/basic hosting tiers block outbound SMTP ports completely** to mitigate network spam and security exploits.
- **The Architectural Solution:** To resolve this hosting environment limitation, Handcrafted Haven communicates with the mailing infrastructure using secure, standard outbound **HTTPS API calls via Google OAuth2**. Because it routes requests through the secure Google API endpoint using an application Client ID, Secret, and a persistent Refresh Token rather than opening standard mail server TCP sockets, it bypasses Render's firewall rules completely, ensuring 100% reliable transactional mail delivery.

---

## 📜 Development Conventions

- **Feature-Grouped Architecture:** All frontend components must be grouped explicitly by domain within the `components/` folder (e.g., `components/chat/Chatbot.tsx`). Loose files under the root components directory are strictly disallowed to maintain scaling velocity.
- **TypeScript Strict Mode:** Maintain type enforcement on frontend state values, layout event payloads, and network JSON contracts to preserve development environment stability.

---

## 📦 Deployment

- **Backend:** Hosted on Render with automatic environment injections.
- **Frontend:** Hosted on Vercel, featuring automated CI/CD builds integrated directly with master branch pushes.

---

## 🧑‍💻 Authors

- Michael Mwanza
- Moshoeshoe Simon Mopeli
- Tinny Mosimanyana
