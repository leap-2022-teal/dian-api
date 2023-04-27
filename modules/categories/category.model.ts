import { Schema, model } from 'mongoose';

export interface ICategory {
  _id: String;
  title: String;
  imageUrl: String;
  coverImageUrl: String;
  iconUrl: String;
  desctiption: String;
  slugUrl: String;
  parentId: String;
  number: Number;
}

const categorySchema = new Schema<ICategory>({
  _id: { type: String },
  title: { type: String },
  imageUrl: { type: String },
  coverImageUrl: { type: String },
  iconUrl: { type: String },
  desctiption: { type: String },
  slugUrl: { type: String },
  parentId: { type: String },
  number: { type: Number },
});

export const Category = model<ICategory>('categories', categorySchema);
