import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.route";
import { categoryRoutes } from "./routes/category.route";
import { productRoutes } from "./routes/product.route";
import { reviewRoutes } from "./routes/review.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Testing Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to The Backend Server!",
  });
});

// Not Found Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found!",
    error: {
      path: req.originalUrl,
      message: "The requested path does not exist!",
    },
  });
});

export default app;
