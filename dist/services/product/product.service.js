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
exports.deleteProductFromDB = exports.updateProductIntoDB = exports.getSingleProductFromDB = exports.getAllProductsFromDB = exports.createProductIntoDB = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
exports.createProductIntoDB = createProductIntoDB;
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        where: { isDeleted: false }, // শুধু যেগুলোর isDeleted ফলস, সেগুলো আনবে
        include: {
            category: true,
        },
    });
    return result;
});
exports.getAllProductsFromDB = getAllProductsFromDB;
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findFirst({
        where: {
            id,
            isDeleted: false,
        },
        include: { category: true },
    });
    return result;
});
exports.getSingleProductFromDB = getSingleProductFromDB;
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.update({
        where: { id },
        data: payload,
        include: { category: true },
    });
    return result;
});
exports.updateProductIntoDB = updateProductIntoDB;
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Soft Delete: ডিলিট না করে শুধু isDeleted ফ্ল্যাগ true করে দেওয়া হলো
    const result = yield prisma_1.default.product.update({
        where: { id },
        data: { isDeleted: true },
    });
    return result;
});
exports.deleteProductFromDB = deleteProductFromDB;
