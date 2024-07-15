import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("Category", CategoriesSchema);

export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());
export const getAllCategories = () =>
  CategoryModel.find()
    .exec()
    .then((categories) => categories.map((category) => category.toObject()));

export const deleteCategoryById = (id: string) =>
  CategoryModel.findByIdAndDelete({ _id: id });
export const updateCateById = (id: string, values: Record<string, any>) =>
    CategoryModel.findByIdAndUpdate(id, values);
export const getCateById = ( id: string) => CategoryModel.findById(id)
