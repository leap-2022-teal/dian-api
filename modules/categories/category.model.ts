import { Schema, model } from "mongoose";

export interface ICategory {
  _id: String;
  title: String;
  image_url: String;
  cover_image_url: String;
  icon_url: String;
  desctiption: String;
  slug_url: String;
}

const categorySchema = new Schema<ICategory>({
  _id: {type: String},
  title: {type: String},
  image_url: {type: String},
  cover_image_url: {type: String},
  icon_url: {type: String},
  desctiption: {type: String},
  slug_url: {type: String}
})

export const Category = model<ICategory>('categories', categorySchema);