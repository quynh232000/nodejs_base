import { isAuthenticated } from "../middlewares";
import { login, me, register, sendMail, testUpload, testUploads } from "../controllers/test";
import express from "express";
import { uploadfile } from "../middlewares/uploadfile";
import multer from "multer";
import { uploadMultiple } from "../middlewares/uploadMultiple";

export default (router: express.Router) => {
  const upload = multer();
  router.post("/test/register", register);
  router.post("/test/login", login);
  router.post(
    "/test/uploadfile",
    upload.single("image"),
    (req, res, next) => {
      uploadfile(req, res, next, "image");
    },
    testUpload
  );
  router.post(
    "/test/uploadfiles",
    upload.fields([{ name: 'image_cover', maxCount: 1 },{ name: 'images', maxCount: 10 }])
    ,uploadMultiple,
    testUploads
  );
  router.get("/test/me", isAuthenticated, me);
  router.post("/test/sendmail", sendMail);
};
