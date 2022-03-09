import "dotenv/config";
import { Application } from "express";
import jwt from "express-jwt";

function authenticationMiddleware(app: Application) {
  /**
   * @description - This is the middleware for the authorization. It checks if the user is authorized to access the route.
   */
  const publicKey = process.env.PUBLIC_KEY!.replace(/\\n/g, "\n");
  app.use(
    jwt({ secret: publicKey, algorithms: ["RS256"] }).unless({
      path: [
        // public routes that don't require authentication
        "/api/v1//users/register",
        "/api/v1/users/login",
      ],
    })
  );
}

export { authenticationMiddleware };
