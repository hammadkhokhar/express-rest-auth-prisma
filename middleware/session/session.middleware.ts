import "dotenv/config";
import expressSession from "express-session";
import { Application } from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function sessionMiddleware(app: Application) {
  /**
   * Session middleware
   */
  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: `${process.env.SESSION_SECRET}`,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );
}

export { sessionMiddleware };
