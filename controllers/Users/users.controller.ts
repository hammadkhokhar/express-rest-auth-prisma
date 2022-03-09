import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import debug from "debug";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import * as argon2 from "argon2";
const log: debug.IDebugger = debug("app:users-controller");
const prisma = new PrismaClient();

class UsersController {
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const { email, fullName, password, phoneNumber } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const hashPassword = await argon2.hash(password);
        await prisma.user
          .create({
            data: {
              email,
              fullName,
              password: hashPassword,
            },
          })
          .then((user) => {
            res.status(200).json({
              status: "User registered successfully.",
            });
          })
          .catch((err) => {
            log(err);
            res.status(500).json({
              status: "error",
            });
          });
      }
    } catch (error) {
      log(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        await prisma.user
          .findUnique({
            where: {
              email,
            },
          })
          .then((user) => {
            if (user) {
              argon2.verify(user.password, password).then((valid) => {
                if (valid) {
                  const privateKey = process.env.PRIVATE_KEY!.replace(
                    /\\n/g,
                    "\n"
                  );
                  const token = jwt.sign(
                    { id: user.id, email: user.email, accessType: process.env.CLIENT_ROLE },
                    privateKey,
                    { algorithm: "RS256" }
                  );
                  res.set("x-auth-token", token);
                  res.status(200).json({
                    status: "User logged in successfully.",
                  });
                } else {
                  res.status(401).json({
                    status: "Invalid credentials.",
                  });
                }
              });
            } else {
              res.status(401).json({
                status: "Invalid credentials.",
              });
            }
          })
          .catch((err) => {
            log(err);
            res.status(500).json({
              status: "error",
            });
          });
      }
    } catch (error) {
      log(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        await prisma.user
          .findMany()
          .then((users) => {
            res.json(users);
          })
          .catch((err) => {
            log(err);
            res.status(500).json({
              status: "error",
            });
          });
      }
    } catch (error) {
      log(error);
    }
  }
}

export default new UsersController();
