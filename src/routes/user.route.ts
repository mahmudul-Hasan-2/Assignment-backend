import { Router } from "express";
import { registerUser, loginUser } from "../services/user/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export const userRoutes = router;
