import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // ১. Bearer আলাদা করে শুধু মূল টোকেনটা নেওয়ার ব্যবস্থা
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token is missing!",
        });
      }

      const verifiedUser = jwt.verify(
        token,
        process.env.JWT_SECRET || "my_secret_key",
      ) as JwtPayload;

      req.user = verifiedUser;

      // ২. রোল বেজড পারমিশন চেক (যদি roles পাস করা হয়)
      if (roles.length && !roles.includes(verifiedUser.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid token or unauthorized access!",
      });
    }
  };
};
