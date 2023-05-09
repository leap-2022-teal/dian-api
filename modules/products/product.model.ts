import { Schema, model } from 'mongoose';
import { Category } from '../categories/category.model';

export interface IBrand {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slugUrl: string;
  coverImageUrl: string;
}

export interface IProduct {
  _id: string;
  title: string;
  brand: IBrand;
  description: {
    short: string;
    full: string;
  };
  slugUrl: string;
  categoryId: string;
  brandImageUrl: string;
  imageUrl: string;
  unitPrice: number;
  brandId: string;
  createdDate: Date;
}

const productSchema = new Schema<IProduct>({
  _id: { type: String },
  title: { type: String },
  brand: {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    slugUrl: { type: String },
    coverImageUrl: { type: String },
  },
  description: {
    short: { type: String },
    full: { type: String },
  },
  slugUrl: { type: String },
  categoryId: { type: String, ref: Category },
  brandImageUrl: { type: String },
  imageUrl: { type: String },
  unitPrice: { type: Number },
  brandId: { type: String },
  createdDate: { type: Date },
});

export const Product = model<IProduct>('products', productSchema);
