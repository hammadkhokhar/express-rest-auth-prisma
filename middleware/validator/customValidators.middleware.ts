import { CustomValidator } from "express-validator";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const doesUserExsists: CustomValidator = async (value) => {
    return await prisma.user
      .findUnique({
        where: {
          email: value,
        },
      })
      .then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
  };
  
const checkRole: CustomValidator = async (value) => {
  const publicKey = process.env.PUBLIC_KEY!.replace(/\\n/g, "\n");
  return jwt.verify(
    value.replace("Bearer ", ""),
    publicKey,
    { algorithms: ["RS256"] },
    (err, decoded) => {
      const { accessType } = decoded as { accessType: string };
      if (accessType != process.env.CLIENT_ROLE) {
        return Promise.reject("Not authorized to access the resource.");
      }
    }
  );
};

export { doesUserExsists, checkRole };