import { Schema, model } from 'mongoose';

export interface IBrand {
  _id: string;
  title: string;
  description: string;
  slugUrl: string;
  imageUrl: string;
  coverImageUrl: string;
  orderNum: number;
}

const brandSchema = new Schema<IBrand>({
  _id: { type: String },
  title: { type: String },
  description: { type: String },
  slugUrl: { type: String },
  imageUrl: { type: String },
  coverImageUrl: { type: String },
  orderNum: { type: Number },
});

export const Brand = model<IBrand>('brands', brandSchema);
