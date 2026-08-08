import prisma from "../../lib/prisma";

export const createProductIntoDB = async (payload: any) => {
  const result = await prisma.product.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

export const getAllProductsFromDB = async () => {
  const result = await prisma.product.findMany({
    where: { isDeleted: false }, // শুধু যেগুলোর isDeleted ফলস, সেগুলো আনবে
    include: {
      category: true,
    },
  });
  return result;
};

export const getSingleProductFromDB = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: { category: true },
  });
  return result;
};

export const updateProductIntoDB = async (id: string, payload: any) => {
  const result = await prisma.product.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
  return result;
};

export const deleteProductFromDB = async (id: string) => {
  // Soft Delete: ডিলিট না করে শুধু isDeleted ফ্ল্যাগ true করে দেওয়া হলো
  const result = await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
  return result;
};
