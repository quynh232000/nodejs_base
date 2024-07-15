import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinaryConfig";

export const uploadfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
  nameFile: string
) => {
  try {
    if (!req.file) {
      req.body[nameFile] = "";
      next();
    } else {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            next(error);
          }
          req.body[nameFile] = result?.secure_url;
          next();
        }
      );
      result.end(req.file.buffer);
    }
  } catch (error) {
    next(error);
  }
};
