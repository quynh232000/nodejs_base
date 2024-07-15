import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewModel = mongoose.model("New", NewsSchema);

export const createNewPro= (values: Record<string, any>) =>
  new NewModel(values).save().then((newItem) => newItem.toObject());
export const getAllNewsPro = () =>
  NewModel.find()
    .exec()
    .then((news) => news.map((newItem) => newItem.toObject()));

export const deleteNewById = (id: string) =>
  NewModel.findByIdAndDelete({ _id: id });
export const updateNewById = (id: string, values: Record<string, any>) =>
    NewModel.findByIdAndUpdate(id, values);
export const getNewById = ( id: string) => NewModel.findById(id)
