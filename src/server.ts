import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import userRouter from "./apis/users/index";
import accomdationRouter from "./apis/accomodations/index";

import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
  notFoundHandler
} from "./errorHandlers";

const server = express();

const port = process.env.PORT || 3001;

// ****************************************************** MIDDLEWARES **********************************************

server.use(cors());
server.use(express.json());

// ******************************************************* ENDPOINTS ***********************************************

server.use("/users", userRouter);
server.use("/accomodations", accomdationRouter);

// ***************************************************** ERROR HANDLERS ********************************************

server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);
server.use(notFoundHandler);

if (process.env.MONGO_CONNECTION_URL) {
  mongoose.connect(process.env.MONGO_CONNECTION_URL);
} else {
  throw new Error("MONGO_CONNECTION_URL is not defined");
}

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
