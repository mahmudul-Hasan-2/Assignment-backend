import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

// শুধু লোকাল বা প্রোডাকশন সার্ভারে (Render/VPS) `app.listen` রান করবে
// Vercel-এর সার্ভারলেস এনভায়রনমেন্টে এটি রান করবে না
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Vercel-এর জন্য এক্সপোর্ট করা বাধ্যতামূলক
export default app;
