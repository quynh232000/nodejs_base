import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinaryConfig";
import { Readable } from "stream";

export const uploadMultiToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.files);

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files) {
      const images: string[] = [];
      let image_cover: string = "";

      if (files.images && files.images.length > 0) {
        for (const file of files.images) {
          const stream = Readable.from(file.buffer);

          const uploadPromise = new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) return reject(error);
                if (result) return resolve(result.secure_url);
              }
            );

            stream.pipe(uploadStream);
          });

          const imageUrl = await uploadPromise;
          images.push(imageUrl);
        }
      }

      if (files.image_cover && files.image_cover.length > 0) {
        const file = files.image_cover[0];
        const stream = Readable.from(file.buffer);

        const uploadPromise = new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) return reject(error);
              if (result) return resolve(result.secure_url);
            }
          );

          stream.pipe(uploadStream);
        });

        image_cover = await uploadPromise;
      }
      if(images.length > 0){

        req.body.images = JSON.stringify(images);
      }
      req.body.image_cover = image_cover;
    }

    next();
  } catch (error) {
    next(error);
  }
};
