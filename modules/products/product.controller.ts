import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, { limit: 10 });
  res.json(list);
}

export async function createNewProductd(req: Request, res: Response) {
  const { title, price, image, categoryId } = req.body;
  const newProduct = new Product({
    _id: new ObjectId(),
    title: title,
    unitPrice: price,
    imageUrl: image.path,
    categoryId: categoryId.value,
  });
  const result = await newProduct.save();
  res.sendStatus(200);
}

export async function singleProduct(req: Request, res: Response) {
  const { id } = req.params;
  const one = await Product.findById(id);
  res.json(one);
}

export async function deleteProductById(req: Request, res: Response) {
  const { id } = req.params;
  await Product.findByIdAndDelete({ _id: id });
  res.json({ deletedId: id });
}

export async function updateProductById(req: Request, res: Response) {
  const { id } = req.params;
  const { title, price, brand, description, image, categoryId } = req.body;
  const newUpdateProduct = new Product({
    title: title,
    unitPrice: price,
    brand: brand,
    description: description,
    imageUrl: image?.path,
    categoryId: categoryId?.value,
  });
  await Product.findByIdAndUpdate({ _id: id }, newUpdateProduct);
  res.json({ updatedId: id });
}
