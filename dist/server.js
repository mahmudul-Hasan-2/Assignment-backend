"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
// শুধু লোকাল বা প্রোডাকশন সার্ভারে (Render/VPS) `app.listen` রান করবে
// Vercel-এর সার্ভারলেস এনভায়রনমেন্টে এটি রান করবে না
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
// Vercel-এর জন্য এক্সপোর্ট করা বাধ্যতামূলক
exports.default = app_1.default;
