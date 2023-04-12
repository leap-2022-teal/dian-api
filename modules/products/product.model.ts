import { Schema, model } from 'mongoose';

export interface IProduct {
  title: string;
  image_url: string;
  unit_price: number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  unit_price: { type: Number, required: true },
});

export const Product = model<IProduct>('products', productSchema);
