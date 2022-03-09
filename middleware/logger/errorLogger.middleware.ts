import { Application } from "express";
import { createLogger, format, transports } from "winston";
import * as expressWinston from "express-winston";
const { combine, timestamp, json, colorize, prettyPrint } = format;

function winstonErrorLogger(app: Application) {
  app.use(
    expressWinston.errorLogger({
      level: "error",
      format: combine(colorize(), json(), timestamp(), prettyPrint()),
      transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        new transports.File({ filename: "error.log", level: "error" }),
      ],
    })
  );
}

export { winstonErrorLogger };
