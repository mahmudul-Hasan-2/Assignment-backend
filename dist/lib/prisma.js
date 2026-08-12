"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const connectionString = process.env.DATABASE_URL;
// 1. pg package থেকে Pool তৈরি করতে হবে
const pool = new pg_1.Pool({ connectionString });
// 2. তারপর সেই pool টা adapter-এ পাস করতে হবে
const adapter = new adapter_pg_1.PrismaPg(pool);
// 3. Vercel/Serverless এর জন্য Singleton Pattern (যাতে বারবার কানেকশন ওপেন না হয়)
const globalForPrisma = global;
const prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
exports.default = prisma;
