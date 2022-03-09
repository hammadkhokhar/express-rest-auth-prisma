import { Application } from "express";
import { createLogger, format, transports } from "winston";
import * as expressWinston from "express-winston";
const { combine, timestamp, json, colorize, prettyPrint } = format;

function errorsMiddleware(app: Application) {
  /**
   * @description - Server Failures
   */
  app.use(
    (
      err: { name: string; stack: string; message: string },
      req: any,
      res: {
        status: (arg0: number) => void;
        json: (arg0: { message: string }) => void;
      },
      next: (arg0: any) => void
    ) => {
      console.error(err.stack);
      res.status(500);
      res.json({ message: err.name + ": " + err.message });
    }
  );
  /**
   * @description - Not Found
   */
  // app.use((req: any,
  //   res: {
  //     status: (arg0: number) => void;
  //     json: (arg0: { message: string }) => void;
  //   }, next) => {
  //     res.status(404);
  //     res.json({ message: "Sorry can't find that!" });
  // });

  /**
   * @description - Authorization
   */
  app.use(
    (
      err: { name: string; message: string },
      req: any,
      res: {
        status: (arg0: number) => void;
        json: (arg0: { message: string }) => void;
      },
      next: (arg0: any) => void
    ) => {
      if (err.name === "UnauthorizedError") {
        res.status(401);
        res.json({ message: err.name + ": " + err.message });
      } else next(err);
    }
  );
}

export { errorsMiddleware };
