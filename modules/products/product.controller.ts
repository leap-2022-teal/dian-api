import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, { limit: 10 }).sort({ createdDate: -1 }).populate('categoryId');
  res.json(list);
}

export async function getFilteredProduct(req: Request, res: Response) {
  const { id } = req.body;
  // const list = await Product.find({categoryId?.parentId:{$eq:selected}}, {}, {}).populate('categoryId')
  // const mainCatList = await Product.find({categoryId:id},{},{limit: 10})
  // const list = await Product.aggregate([{$lookup:{from:"categories", localField:"categoryId", foreignField:"_id",as:"category"}},{$match:{"category.slugUrl":id}}])
  const mainCatList = await Product.aggregate([
    { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
    { $lookup: { from: 'categories', localField: 'category.parentId', foreignField: '_id', as: 'parentCategory' } },
    { $match: { $or: [{ 'parentCategory.slugUrl': id }, { 'category.slugUrl': id }] } },
  ]).sort({ createdDate: -1 });
  // if(list.length<1){
  //   res.json(mainCatList);
  // } else {
  //   res.json(list)
  // }
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

  // db.products.updateOne({ _id: 'a32a4f35-8a0b-41ff-8d09-bf6225fba9af' }, { $set: { createdDate: ISODate('2023-05-09T00:00:00.000Z') } });
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
    brand: { title: brand },
    description: { short: description },
    imageUrl: image?.path,
    categoryId: categoryId?.value,
  });
  await Product.findByIdAndUpdate({ _id: id }, newUpdateProduct);
  res.json({ updatedId: id });
}
