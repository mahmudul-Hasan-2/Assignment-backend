import { Request, Response } from "express";
import { createReviewIntoDB, getAllReviewsFromDB } from "./review.service";

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get authenticated user id from auth middleware
    const userId = (req as any).user?.id || (req as any).user?.userId;

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

    const result = await createReviewIntoDB(userId, {
      productId,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully!",
      data: result,
    });
  } catch (error: any) {
    console.error("Create Review Error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong while creating review!",
    });
  }
};

export const getAllReviews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await getAllReviewsFromDB();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};
