import { Router } from "express";
import {
  createReview,
  getAllReviews,
} from "../services/review/review.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", auth(), createReview);
router.get("/", getAllReviews);

export const reviewRoutes = router;
