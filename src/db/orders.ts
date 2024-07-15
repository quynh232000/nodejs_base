import mongoose, { Schema } from "mongoose";
import { OrderModelType } from "../type/type";

const OrderSchema = new mongoose.Schema(
  {
    province: { type: String, required: true },
    ward: { type: String, required: true },
    district: { type: String, required: true },
    name_receiver: { type: String, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    sub_total: { type: Number, required: true },
    phone: { type: Number, required: true },
    free_ship: { type: Number, required: true },
    status: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order_details:[
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);

export const createOrder = (values: OrderModelType) =>
  new OrderModel(values).save().then((order) => order.toObject());


export const getAllOrder = ({page = 1, limit = 10, userId = ""}) =>
  {
    const query: any = {};
    if (userId && userId != '') {
      query.user = userId;
    }

   return OrderModel.find(query)
    .populate("user")
    .populate("order_details.product")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec()
    .then((orders) =>
      orders.map((order) =>order.toObject())
    )};

export const getOrderDetailById = (id: string) =>
  OrderModel.findById(id)
    .populate("order_details.product")
    .populate("user")
    .exec()
    .then((order) => order.toObject());
