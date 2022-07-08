import createHttpError from "http-errors";
import { RequestHandler, Request } from "express";
import { ObjectId } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id?: ObjectId;
    role?: string | undefined;
  };
}

export const hostOnlyMiddleware: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  if (req.user?.role === "host") {
    next();
  } else {
    next(createHttpError(403, "You are not a host!"));
  }
};
