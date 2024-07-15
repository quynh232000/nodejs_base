import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinaryConfig";

export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      req.body.image = "";
      next();
    } else {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            // return next(error);
            return next();
          }
          req.body.image = result?.secure_url;
          next();
        }
      );

      result.end(req.file.buffer);
    }
  } catch (error) {
    // next(error);
    next()
  }
};
