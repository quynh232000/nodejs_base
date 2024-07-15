import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: String, required: true },
    image_cover: { type: String, required: true },
    slug: { type: String, required: true },
    origin: { type: String, required: true },
    origin_detail: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: false },
    is_show: { type: Boolean, required: false, default: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    percent_sale: { type: Number, required: false, default: 0 },
    // category_id: { type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", ProductSchema);

export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product) => product.toObject());


export const getAllProduct = ({page = 1, limit = 10, categoryId=null, type=null, orderBy=null, keySearch=null}) =>
  {
    const query: any = {};
    
    
    if (categoryId && categoryId != '') {
      query.category = categoryId;
    }
    if (type && type != null) {
      query.type = type;
    }
    if (keySearch && keySearch != null) {
      query.name = { $regex: keySearch, $options: 'i' };
    }


    orderBy = orderBy == null ? 'createdAt' : orderBy
    
   return ProductModel.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(orderBy)
    .exec()
    .then((products) =>
      products.map((product) => {
        const p = product.toObject();

        p.images = JSON.parse(p.images);
        return p;
      })
    )};

export const deleteProductById = (id: string) =>
  ProductModel.findByIdAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) =>
  ProductModel.findByIdAndUpdate(id, values);
export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductDetailById = (id: string) =>
  ProductModel.findById(id)
    .populate("category")
    .exec()
    .then((product) => {
      const p = product.toObject();

      p.images = JSON.parse(p.images);
      return p;
    });
