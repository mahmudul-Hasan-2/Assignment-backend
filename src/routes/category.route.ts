import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createCategory,
  getAllCategories,
} from "../services/category/category.controller";

const router = Router();

router.post("/", auth(), createCategory);
router.get("/", getAllCategories);

export const categoryRoutes = router;
