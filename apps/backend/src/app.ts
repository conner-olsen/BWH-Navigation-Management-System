import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import csvRouter from "./routes/csv-handler.ts";
import bfsRouter from "./routes/bfs-route.ts";
import dfsRouter from "./routes/dfs-route.ts";
import bfsAstarRouter from "./routes/Astar-route.ts";
import userRouter from "./routes/user-route.ts";
import nodeRouter from "./routes/node-route.ts";
import edgeRouter from "./routes/populate-edges.ts";
import downloadNodeDataRouter from "./routes/data-to-csv-node.ts";
import downloadEdgeDataRouter from "./routes/data-to-csv-edge.ts";
import employeeRouter from "./routes/populate-employee.ts";
import authoRouter from "./routes/storing-auth0-users.ts";
import employeeMod from "./routes/employeeMod.ts";
import graphRoute from "./routes/GraphRoute.ts";
import allServiceData from "./routes/all-service-logs.ts";
import serviceRequest from "./routes/service-request.ts";
import employeeCSVRouter from "./routes/employee-to-csv.ts";
import getStats from "./routes/count-service-requests.ts";
import getEmployeeStats from "./routes/count-employee-service-requests.ts";
import totalDataImport from "./routes/single-button-import.ts";



const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/api/csv-to-json", csvRouter);
app.use("/api/node-populate", nodeRouter);
app.use("/api/bfs-searching", bfsRouter);
app.use("/api/dfs-searching", dfsRouter);
app.use("/api/bfsAstar-searching", bfsAstarRouter);
app.use("/api/edge-populate", edgeRouter);
app.use("/api/user", userRouter);
app.use("/api/download-node-csv", downloadNodeDataRouter);
app.use("/api/download-edge-csv", downloadEdgeDataRouter);
app.use("/api/populate-employee", employeeRouter);
app.use("/api/graph",graphRoute);
app.use("/api/populate-autho", authoRouter);
app.use("/api/employee-mod", employeeMod);
app.use("/api/all-service-data", allServiceData);
app.use("/api/service-request", serviceRequest);
app.use("/api/employee-csv", employeeCSVRouter);
app.use("/api/get-stats", getStats);
app.use("/api/get-employee-stats", getEmployeeStats);
app.use("/api/single-button-import", totalDataImport);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});



export default app; // Export the backend, so that www.ts can start it
