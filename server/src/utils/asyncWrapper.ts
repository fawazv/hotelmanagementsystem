import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/authMiddleware";

type AsyncFunction = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncWrapper = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncWrapper;
