import prisma from "../../lib/prisma";

export const createReviewIntoDB = async (
  userId: string,
  payload: { productId: string; rating: number; comment?: string },
) => {
  console.log("Service received userId →", userId); // temporary log

  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      userId: userId, // using scalar (simpler)
      productId: payload.productId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};
