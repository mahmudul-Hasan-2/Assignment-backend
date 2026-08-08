import { Request, Response } from "express";
import { createUserIntoDB, loginUserIntoDB } from "./user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await loginUserIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed!",
    });
  }
};
