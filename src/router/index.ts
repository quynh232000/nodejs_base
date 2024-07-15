import express from "express";
// import authentication from "./authentication";
// import users from "./users";
// import category from "./category";
// import product from "./product";
// import orders from "./orders";
// import news from "./news";
import test from "./test";

const router = express.Router()

export default (): express.Router => {
    // authentication(router)

    // users(router)
    // news(router)
    // category(router)
    // product(router)
    // orders(router)
    test(router)
    return router
}