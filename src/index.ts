import express from "express";
import * as http from "http";
const app: express.Application = express();
const server: http.Server = http.createServer(app);
// middlewares
import { authenticationMiddleware } from "../middleware/authentication/authorization.middleware";
import { sessionMiddleware } from "../middleware/session/session.middleware";
import { winstonLogger } from "../middleware/logger/logger.middleware";
import { winstonErrorLogger } from "../middleware/logger/errorLogger.middleware";
import { errorsMiddleware } from "../middleware/errors/errors.middleware";
// routes
import userRoutes from "../routes/Users/users.routes";

app.use(express.json());

/**
 * @description - This is the main entry point for the middlewares.
 * @param {express.Application} app - The express application.
 */
sessionMiddleware(app);
authenticationMiddleware(app);
winstonLogger(app);
errorsMiddleware(app);

/**
 * @description - This is the main entry point for the routes.
 * @param {express.Application} app - The express application.
 */
userRoutes(app);
winstonErrorLogger(app); // errorLogger comes after routes (Middleware)

server.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
