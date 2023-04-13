import { Request, Response } from 'express';
import { title } from 'process';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, { limit: 12 });
  res.json(list);
}
