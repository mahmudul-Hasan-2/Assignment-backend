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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const verifiedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "my_secret_key");
            req.user = verifiedUser;
            // ২. রোল বেজড পারমিশন চেক (যদি roles পাস করা হয়)
            if (roles.length && !roles.includes(verifiedUser.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resource.",
                });
            }
            next();
        }
        catch (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid token or unauthorized access!",
            });
        }
    });
};
exports.auth = auth;
