import { Application } from "express";
import { createLogger, format, transports } from "winston";
import * as expressWinston from "express-winston";
const { combine, timestamp, json, colorize, prettyPrint } = format;

function winstonLogger(app: Application) {
  app.use(
    expressWinston.logger({
      level: "info",
      format: combine(colorize(), json(), timestamp(), prettyPrint()),
      transports: [
        // - Write all logs with importance level of `info` or less to `combined.log`
        new transports.File({ filename: "combined.log" }),
      ],
    })
  );
}

export { winstonLogger };
