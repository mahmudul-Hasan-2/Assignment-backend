import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;

// 1. pg package থেকে Pool তৈরি করতে হবে
const pool = new Pool({ connectionString });

// 2. তারপর সেই pool টা adapter-এ পাস করতে হবে
const adapter = new PrismaPg(pool);

// 3. Vercel/Serverless এর জন্য Singleton Pattern (যাতে বারবার কানেকশন ওপেন না হয়)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
