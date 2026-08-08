"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routes/user.route");
const category_route_1 = require("./routes/category.route");
const product_route_1 = require("./routes/product.route");
const review_route_1 = require("./routes/review.route");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Routes
app.use("/api/v1/users", user_route_1.userRoutes);
app.use("/api/v1/categories", category_route_1.categoryRoutes);
app.use("/api/v1/products", product_route_1.productRoutes);
app.use("/api/v1/reviews", review_route_1.reviewRoutes);
// Testing Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to The Backend Server!",
    });
});
// Not Found Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Not Found!",
        error: {
            path: req.originalUrl,
            message: "The requested path does not exist!",
        },
    });
});
exports.default = app;
