import "dotenv/config";
import { Application } from "express";
import { body, check, header } from "express-validator";
import { doesUserExsists, checkRole } from "../../middleware/validator/customValidators.middleware";
import UsersController from "../../controllers/Users/users.controller";

// configure API routes
async function routesV1(app: Application) {
  app.post(
    "/api/v1/users/register",
    body("email")
      .isEmail()
      .custom(doesUserExsists)
      .notEmpty(),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Passowrd must be at least 6 chars long."),
    body("phoneNumber").notEmpty(),
    body("fullName").notEmpty(),
    UsersController.registerUser
  );

  app.get(
    "/api/v1/users",
    header("Authorization").custom(checkRole),
    UsersController.getUsers
  );

  app.post(
    "/api/v1/users/login",
    body("email").isEmail().notEmpty(),
    body("password").notEmpty(),
    UsersController.loginUser
  );
}

export default routesV1;
