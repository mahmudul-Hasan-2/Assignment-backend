import { Request, Response } from "express";
import {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
} from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await createCategoryIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await getAllCategoriesFromDB();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};
