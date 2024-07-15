import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";



const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(compression());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const MONGO_URL = "mongodb://localhost:27017/webshop";

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
mongoose.connection.on("error", (error: Error) => console.log(error));


app.use("/", router());

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});
