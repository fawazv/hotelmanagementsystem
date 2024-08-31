import CustomError from "../utils/CustomError.js";
import { Request, Response, NextFunction } from "express";

type ErrorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const errorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific errors here if needed
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle unexpected errors eg: database error
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
