import prisma from "../../lib/prisma";

export const createCategoryIntoDB = async (payload: { name: string }) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

export const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return result;
};
