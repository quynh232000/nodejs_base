import express from "express";
import { PersonModel } from "../db/person";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomRequest } from "../type/express";
import nodemailer from "nodemailer";

// kdrv odqe aszd uwoy
// emailapp

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const person = await PersonModel.findOne({ email: req.body.email });

    if (person) {
      return res
        .status(200)
        .json({ status: false, message: "Email already exists!" });
    }
    const hasedPassword = await bcrypt.hash(req.body.password, 12);

    const newPerson = await PersonModel.create({
      ...req.body,
      password: hasedPassword,
      role: "menber",
    });

    const token = jwt.sign(
      { _id: newPerson.id, user: newPerson },
      "secretkey",
      {
        expiresIn: "90d",
      }
    );

    return res
      .status(201)
      .json({
        status: true,
        message: "Register successfully!",
        data: newPerson,
        token: token,
      })
      .end();
  } catch (error) {
    console.error("Error from server: ", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const person = await PersonModel.findOne({ email: req.body.email });

    if (!person) {
      return res
        .status(404)
        .json({ status: false, message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(req.body.password, person.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Incorrect password!" });
    }
    const token = jwt.sign({ _id: person.id, user: person }, "secretkey", {
      expiresIn: "90d",
    });
    return res
      .status(200)
      .json({
        status: true,
        message: "Login successfully!",
        data: person,
        token: token,
      })
      .end();
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};

export const me = async (req: CustomRequest, res: express.Response) => {
  try {
    return res
      .status(200)
      .json({
        status: true,
        message: "Get infomarion successfully!",
        data: req.user,
      })
      .end();
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};
export const testUpload = async (req: CustomRequest, res: express.Response) => {
  try {
    return res
      .status(200)
      .json({ status: true, message: " successfully!", data: req.body.image })
      .end();
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};
export const testUploads = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    return res
      .status(200)
      .json({
        status: true,
        message: " successfully!",
        data: req.body.image_cover,
        list: req.body.images,
      })
      .end();
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "tranong600@gmail.com",
    pass: "kdrv odqe aszd uwoy",
  },
});
export const sendMail = async (req: express.Request, res: express.Response) => {
 
  try {
    const { email } = req.body;
    const mailOptions = {
      from: "tranong600@gmail.com",
      to: email,
      subject: "Test send mail nodejs",
      text: "Test send mail nodejs",
      html: "<h1>This is a notification to test send mail in nodejs</h1>",
    };
    
    try {
      const info = await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ status: true, message: "Email sent: " + info.response })
        .end();
    } catch (error) {
      console.error("Error sending email:", error);
      return res
        .status(200)
        .json({ status: false, message: "Error sending email:", error })
        .end();
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error from server...",
        error: error.message,
      });
  }
};
