import express from "express";
import createError from "http-errors";
import accomdationModel from "./model.js";
import { hostOnlyMiddleware } from "../../auth/host.js";
import { JWTAuthMiddleware } from "../../auth/token.js";
import { generateAccessToken } from "../../auth/tools.js";

const accomdationRouter = express.Router();

accomdationRouter.post(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const newAccomdation = new accomdationModel(req.body);
      const { _id } = await newAccomdation.save();
      res.status(201).send({ _id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

accomdationRouter.get("/", async (req, res, next) => {
  try {
    const accomdations = await accomdationModel.find();
    res.send(accomdations);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

accomdationRouter.get(
  "/:accomdationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const accomdation = await accomdationModel.findById(
        req.params.accomdationId
      );
      if (accomdation) {
        res.send(accomdation);
      } else {
        next(
          createError(
            404,
            `Accomdation with id ${req.params.accomdationId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

accomdationRouter.put(
  "/:accomdationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updatedAccomdation = await accomdationModel.findByIdAndUpdate(
        req.params.accomdationId,
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedAccomdation) {
        res.send(updatedAccomdation);
      } else {
        next(
          createError(
            404,
            `Accomdation with id ${req.params.accomdationId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

accomdationRouter.delete(
  "/:accomdationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deletedAccomdation = await accomdationModel.findByIdAndDelete(
        req.params.accomdationId
      );
      if (deletedAccomdation) {
        res.send(deletedAccomdation);
      } else {
        next(
          createError(
            404,
            `Accomdation with id ${req.params.accomdationId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default accomdationRouter;
