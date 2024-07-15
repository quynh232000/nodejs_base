import { createProduct, deleteProductById, getAllProduct, getProductById, getProductDetailById } from "../db/product";
import express from "express";
import { isArray } from "lodash";
// import { createCategory, deleteCategoryById, getAllCategories, getCateById } from '../db/categories'
import slugify from "slugify";

export const createPro = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  
  try {
    const {
      name,
      images,
      image_cover,
      origin,
      origin_detail,
      description,
      quantity,
      price,
      category,
    } = req.body;
    if (
        !name ||
        !images ||
        !image_cover ||
        !origin ||
        !origin_detail ||
        !description ||
        !quantity ||
        !price ||
        !category
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const typePro = req.body.percent_sale && req.body.percent_sale > 30 ? 'Sale' : ''
    const product = await createProduct({
      name,
      images,
      image_cover,
      origin,
      origin_detail,
      description,
      type: typePro,
      quantity,
      price,
      category,
      percent_sale: req.body.percent_sale??0,
      slug: slugify(name, { lower: true, strict: true }),
    });

    return res
      .status(200)
      .json({ status: true, message: "Tạo sản phẩm thành công", data: product })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const getAllPro = async (
  req: express.Request,
  res: express.Response
) => {
  try {
   
    const { page = 1, limit = 10, categoryId="", type=null, orderBy=null, keySearch=null} = req.query;
    // const { categoryId } = req.params;
    console.log(page);
    console.log(limit);
    console.log(categoryId);
    
    
    const data = await getAllProduct({page: +page, limit: +limit, categoryId: categoryId+"", type: type, orderBy, keySearch})
    return res
      .status(200)
      .json({ status: true, message: "Lấy sản phẩm thành công", data: data })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({status:false,mesage:"Error from server...",error});
  }
};

export const getDetailPro = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Vui lòng truyền id" })
        .end();
    }
    const data = await getProductDetailById(id);
    if(!data){
      return res.status(200)
      .json({ status: true, message: "Sản phẩm không tồn tại"})
      .end();
    }
    return res
      .status(200)
      .json({ status: true, message: "Lấy sản phẩm thành công", data: data })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePro = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Vui lòng truyền id" })
        .end();
    }
    const deletePro = await deleteProductById(id);
    return res
      .status(400)
      .json({
        status: true,
        message: "Xóa sản phẩm thành công",
        data: deletePro,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePro = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { 
      name,
      images,
      image_cover,
      origin,
      origin_detail,
      description,
      quantity,
      price,
      percent_sale,
      category,
     } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Vui lòng truyền id" })
        .end();
    }

    const product = await getProductById(id);
    if (!product) {
      return res
        .status(400)
        .json({ status: false, message: "Sản phẩm không tồn tại" })
        .end();
    }
    if (name && name != "" && name != product.name) {
      product.name = name;
      product.slug = slugify(name, { lower: true, strict: true });
    }
    if (images && images !== "" && images != product.images ) {
      product.images = images;
    }
    if (image_cover && image_cover !== "" && image_cover != product.image_cover) {
      product.image_cover = image_cover;
    }
    if (origin && origin !== "" && origin != product.origin) {
      product.origin = origin;
    }
    if (origin_detail && origin_detail !== "" && origin_detail != product.origin_detail) {
      product.origin_detail = origin_detail;
    }
    if (description && description !== "" && description != product.description) {
      product.description = description;
    }
    if (quantity && quantity !== "" && quantity != product.quantity) {
      product.quantity = quantity;
    }
    if (price && price !== "" && price != product.price) {
      product.price = price;
    }
    if (percent_sale && percent_sale !== "" && percent_sale != product.percent_sale) {
      product.percent_sale = percent_sale;
      product.type = percent_sale > 30 ? 'Sale' : ''
    }
    if (category && category !== "" && category != product.category) {
      product.category = category;
    }
    await product.save();

    return res
      .status(200)
      .json({ status: true, message: "Sản phẩm cập nhật thành công" ,data:product})
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
