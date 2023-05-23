import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  //Adminii search query
  const { searchQuery } = req.query;
  const { page } = req.query;
  console.log(page);
  const filter: any = {};

  let skip: number = 0;
  if (page && Number(page)) {
    skip = (Number(page) - 1) * 20;
  }

  if (searchQuery) {
    const re = new RegExp(`${searchQuery}`, 'i');
    filter.title = re;
  }

  console.log(filter);
  const count = await Product.find(filter, {}).count();
  const list = await Product.find(filter, {}).skip(skip).limit(20).sort({ createdDate: -1 }).populate('categoryId');

  console.log(count);
  res.json({ list, count });
}

export async function getSpecialProduct(req: Request, res: Response) {
  const list = await Product.find({ key: 'special' }, {}, { limit: 6 }).sort({ createdDate: -1 });
  res.json(list);
}

export async function getNewProduct(req: Request, res: Response) {
  const list = await Product.find({ key: 'new' }, {}, { limit: 9 }).sort({ createdDate: -1 });
  res.json(list);
}

export async function getProductPagination(req: Request, res: Response) {
  let limit = parseInt(req.query.limit as string);
  let page = parseInt(req.query.page as string);

  if (!page) page = 1;
  if (!limit) limit = 15;

  const skip = (page - 1) * limit;
  const list = await Product.find({}, {}).sort({ createdDate: -1 }).populate('categoryId').skip(skip).limit(limit);

  res.json(list);
}

export async function getFilteredProduct(req: Request, res: Response) {
  const { id } = req.body;

  const mainCatList = await Product.aggregate([
    { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
    { $lookup: { from: 'categories', localField: 'category.parentId', foreignField: '_id', as: 'parentCategory' } },
    { $match: { $or: [{ 'parentCategory.slugUrl': id }, { 'category.slugUrl': id }] } },
  ]).sort({ createdDate: -1 });

  res.json(mainCatList);
}

export async function getFilteredProductPagination(req: Request, res: Response) {
  const { id } = req.body;
  let limit = parseInt(req.query.limit as string);
  let page = parseInt(req.query.page as string);

  if (!page) page = 1;
  if (!limit) limit = 15;

  const skip = (page - 1) * limit;

  const mainCatList = await Product.aggregate([
    { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
    { $lookup: { from: 'categories', localField: 'category.parentId', foreignField: '_id', as: 'parentCategory' } },
    { $match: { $or: [{ 'parentCategory.slugUrl': id }, { 'category.slugUrl': id }] } },
  ])
    .sort({ createdDate: -1 })
    .skip(skip)
    .limit(limit);

  res.json(mainCatList);
}

export async function createNewProductd(req: Request, res: Response) {
  const { title, price, brand, description, image, categoryId } = req.body;
  const newProduct = new Product({
    _id: new ObjectId(),
    title: title,
    unitPrice: price,
    imageUrl: image?.path,
    brand: { title: brand },
    description: { short: description },
    categoryId: categoryId.value,
    createdDate: new Date(),
  });

  const result = await newProduct.save();
  res.sendStatus(200);
}

export async function singleProduct(req: Request, res: Response) {
  const { id } = req.params;
  const one = await Product.find({ slugUrl: id });
  res.json(one);
}
export async function categoryProduct(req: Request, res: Response) {
  const { id } = req.params;
  const one = await Product.find({ categoryId: id });
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
    brand: { title: brand },
    description: { short: description },
    imageUrl: image?.path,
    categoryId: categoryId?.value,
  });
  await Product.findByIdAndUpdate({ _id: id }, newUpdateProduct);
  res.json({ updatedId: id });
}
