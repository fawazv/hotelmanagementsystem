import jwt, {  JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export interface CustomRequest extends Request {
  user?: CustomJwtPayload;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET
    ) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
