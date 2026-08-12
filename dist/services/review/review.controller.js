"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviews = exports.createReview = void 0;
const review_service_1 = require("./review.service");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Get authenticated user id from auth middleware
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
        console.log("userId", userId);
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized! Please login to submit a review.",
            });
            return;
        }
        const { productId, rating, comment } = req.body;
        if (!productId || !rating) {
            res.status(400).json({
                success: false,
                message: "productId and rating are required.",
            });
            return;
        }
        const result = yield (0, review_service_1.createReviewIntoDB)(userId, {
            productId,
            rating: Number(rating),
            comment,
        });
        res.status(201).json({
            success: true,
            message: "Review created successfully!",
            data: result,
        });
    }
    catch (error) {
        console.error("Create Review Error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong while creating review!",
        });
    }
});
exports.createReview = createReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, review_service_1.getAllReviewsFromDB)();
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
});
exports.getAllReviews = getAllReviews;
