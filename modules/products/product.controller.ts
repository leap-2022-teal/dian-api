import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, { });
  res.json(list);
}

export async function createNewProductd(req: Request, res: Response) {
  const { title, price, image, categoryId } = req.body;
  const newProduct = new Product({
    _id: new ObjectId(),
    title: title,
    unitPrice: price,
    imageUrl: image.path,
    categoryId: categoryId.value
  })
  const result = await newProduct.save();
  res.sendStatus(200);
}

export async function singleCategory(req:Request, res: Response) {
  const { id } = req.params;
  const one = await Product.findById(id);
  res.json(one);
}