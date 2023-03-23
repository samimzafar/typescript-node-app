import express, { Application, NextFunction, Request, Response } from "express";
import expressLogger from "express-bunyan-logger";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app: Application = express();

app.use(express.static("assets"));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ], // remove extra details from log
  })
);
// app.use(expressLogger.errorLogger());
app.use(cors()); // will configure later

// Test Route
app.get("/api/test", (req: Request, res: Response) => {
  res.status(200).send(`API BOILERPLATE 2.0`);
});

// routes
app.use("/api", router);

// catch 404
app.use((req: Request, res: Response) => {
  return res.status(404).send("Route / Endpoint not found");
});

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // for now log the error and return 500; need to handle it differently in future
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send(err.message);
});

export default app;
