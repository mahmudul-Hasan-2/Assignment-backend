import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database with rich product data...");

  // 1. Categories
  const categoriesData = [
    { name: "Fullstack" },
    { name: "Frontend" },
    { name: "Backend" },
    { name: "AI & Tools" },
    { name: "UI Kits" },
    { name: "DevOps & Cloud" },
  ];

  const categoryMap: { [key: string]: string } = {};

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    categoryMap[cat.name] = createdCat.id;
  }

  // 2. Products Data
  const productsData = [
    // Fullstack
    {
      title: "Next.js 15 SaaS Boilerplate",
      description:
        "A production-ready fullstack boilerplate with Prisma, Tailwind CSS, Stripe subscription integration, and authentication pre-configured.",
      price: 49.99,
      status: "AVAILABLE",
      categoryName: "Fullstack",
    },
    {
      title: "MERN Stack E-Commerce Engine",
      description:
        "Complete marketplace starter kit with React, Node.js, Express, MongoDB, and Redux Toolkit state management.",
      price: 39.99,
      status: "AVAILABLE",
      categoryName: "Fullstack",
    },

    // Frontend
    {
      title: "Modern Dashboard Template",
      description:
        "High-performance admin dashboard template built with Next.js App Router, Tailwind CSS, and Recharts.",
      price: 29.99,
      status: "AVAILABLE",
      categoryName: "Frontend",
    },
    {
      title: "Portfolio & Agency Landing Page Kit",
      description:
        "Sleek, responsive, and animated landing pages built for modern web agencies and freelancers.",
      price: 19.99,
      status: "AVAILABLE",
      categoryName: "Frontend",
    },

    // Backend
    {
      title: "Node.js Microservices Starter",
      description:
        "Scalable backend architecture using Nest.js, RabbitMQ, Docker, and PostgreSQL with JWT authentication.",
      price: 59.99,
      status: "AVAILABLE",
      categoryName: "Backend",
    },
    {
      title: "Express REST API Boilerplate",
      description:
        "Secure and modular REST API boilerplate featuring TypeScript, Prisma ORM, and comprehensive error handling.",
      price: 24.99,
      status: "AVAILABLE",
      categoryName: "Backend",
    },

    // AI & Tools
    {
      title: "AI Content Generator Starter Kit",
      description:
        "Ready-to-use AI wrapper template powered by OpenAI API, Next.js App Router, and vector database integration.",
      price: 79.99,
      status: "AVAILABLE",
      categoryName: "AI & Tools",
    },
    {
      title: "Prompt Engineering Workspace Tool",
      description:
        "Interactive web app for developers to test, save, and export customized LLM prompts easily.",
      price: 34.99,
      status: "AVAILABLE",
      categoryName: "AI & Tools",
    },

    // UI Kits
    {
      title: "Advanced UI Component Library",
      description:
        "Over 100+ accessible, animated, and high-performance React components built with Tailwind CSS and Framer Motion.",
      price: 29.99,
      status: "AVAILABLE",
      categoryName: "UI Kits",
    },
    {
      title: "Glassmorphism Design System",
      description:
        "Exclusive collection of modern glassmorphism UI elements, buttons, cards, and navigation bars.",
      price: 15.0,
      status: "AVAILABLE",
      categoryName: "UI Kits",
    },

    // DevOps & Cloud
    {
      title: "Advanced DevOps & Docker Guide Kit",
      description:
        "Complete configuration files, CI/CD pipeline templates, and automated deployment scripts for modern cloud servers.",
      price: 35.0,
      status: "AVAILABLE",
      categoryName: "DevOps & Cloud",
    },
    {
      title: "Kubernetes Cluster Deployment Scripts",
      description:
        "Production-ready helm charts, Kubernetes manifests, and automated scaling scripts for high-traffic apps.",
      price: 65.0,
      status: "AVAILABLE",
      categoryName: "DevOps & Cloud",
    },
  ];

  for (const prod of productsData) {
    const categoryId = categoryMap[prod.categoryName];
    if (categoryId) {
      const existing = await prisma.product.findFirst({
        where: { title: prod.title },
      });

      if (!existing) {
        await prisma.product.create({
          data: {
            title: prod.title,
            description: prod.description,
            price: prod.price,
            status: prod.status as any,
            categoryId: categoryId,
          },
        });
      }
    }
  }

  console.log("✅ Seeding completed successfully with dummy products!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
