import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../services/product/product.controller";

const router = Router();

router.post("/", auth(), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.patch("/:id", auth(), updateProduct);
router.delete("/:id", auth(), deleteProduct);

export const productRoutes = router;
