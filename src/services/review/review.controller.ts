import { Request, Response } from "express";
import { createReviewIntoDB, getAllReviewsFromDB } from "./review.service";

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await createReviewIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Review created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
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
