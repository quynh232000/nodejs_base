
import express from "express";
import { OrderModelType } from "../type/type";
import { get } from 'lodash';
import { createOrder, getAllOrder, getOrderDetailById } from "../db/orders";



export const createOrderProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data: OrderModelType  = req.body;


    const currentUserId = get(req, 'identity._id') as string
    if(!currentUserId){
      return res
        .status(200)
        .json({ status: false, message: "Vui lòng đăng nhập" })
        .end();
    }
    data.user = currentUserId
    if(!data.province || data.province == ""
       || !data.ward || data.ward == ""
       || !data.district || data.district == ""
       || !data.address || data.address == ""
       || !data.name_receiver || data.name_receiver == ""
       || !data.phone || data.phone == null
      ){
      return  res
      .status(200)
      .json({ status: false, message: "Vui lòng nhập đầy đủ thông tin" })
      .end();
    }
    if(data.order_details.length == 0) {
      return  res
      .status(200)
      .json({ status: false, message: "Vui lòng nhập thông tin chi tiết" })
      .end();
    }

    const fee_ship = 30000
    let sub_total = 0
    data.order_details.forEach(item => {
      sub_total += (+item.price * +item.quantity)
    })
    data.total = sub_total + fee_ship
    data.sub_total = sub_total
    data.free_ship = fee_ship
    data.status = "success"
    
    const order =  await createOrder(data)
    return res
      .status(200)
      .json({ status: true, message: "Đơn hàng thành công", data: order })
      .end();
  } catch (error) {
    console.error("Error from server: ", error);
    return res.status(400).json({ status: false, message: "Error from server...", error: error.message });
  }
};
export const getAllOrderProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
   
    const { page = 1, limit = 10, type=""} = req.query;

    const currentUserId = get(req, 'identity._id') as string
    if(!currentUserId){
      return res
        .status(200)
        .json({ status: false, message: "Vui lòng đăng nhập" })
        .end();
    } 
    let data = []
    if(type && type == "all"){
       data = await getAllOrder({page: +page, limit: +limit})
    }else{
       data = await getAllOrder({page: +page, limit: +limit, userId: currentUserId+""})
    }

    return res
      .status(200)
      .json({ status: true, message: "Lấy sản phẩm thành công", data: data })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({status:false,mesage:"Error from server...",error});
  }
};

export const getOrderDetailPro = async (
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
    const data = await getOrderDetailById(id);
    if(!data){
      return res.status(200)
      .json({ status: true, message: "Đơn hàng không tồn tại"})
      .end();
    }
    return res
      .status(200)
      .json({ status: true, message: "Lấy chi tiết đơn hàng thành công", data: data })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({status: false, message: "Error server...",error})
  }
};

