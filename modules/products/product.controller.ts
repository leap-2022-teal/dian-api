import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, { limit: 12 });
  res.json(list);
}

export async function createNewProductd(req: Request, res: Response) {
  const { title } = req.body;
  const newProduct = new Product({
    _id: new ObjectId(),
    title: title,
  })
  const result = await newProduct.save();
  res.sendStatus(200);
}