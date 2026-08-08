import prisma from "../../lib/prisma";

export const createReviewIntoDB = async (payload: any) => {
  const result = await prisma.review.create({
    data: payload,
    include: {
      user: true,
      product: true,
    },
  });
  return result;
};

export const getAllReviewsFromDB = async () => {
  const result = await prisma.review.findMany({
    where: { isDeleted: false },
    include: {
      user: true,
      product: true,
    },
  });
  return result;
};
