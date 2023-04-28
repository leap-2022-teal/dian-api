import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Product } from './product.model';

export async function getProduct(req: Request, res: Response) {
  const list = await Product.find({}, {}, {limit:10}).populate('categoryId')
  res.json(list);
}

export async function getFilteredProduct(req: Request, res: Response) {
  const {selected} = req.body
  // const list = await Product.find({categoryId?.parentId:{$eq:selected}}, {}, {}).populate('categoryId')
  const mainCatList = await Product.find({categoryId:selected},{},{limit:10})
  const list = await Product.aggregate([{$lookup:{from:"categories", localField:"categoryId", foreignField:"_id",as:"category"}},{$match:{"category.parentId":selected}}])
  console.log(mainCatList)
  if(mainCatList.length>0){
    res.json(mainCatList);
  } else {
    res.json(list)
  }
}


export async function createNewProductd(req: Request, res: Response) {
  const { title, price, brand, description, image, categoryId } = req.body;
  const newProduct = new Product({
    _id: new ObjectId(),
    title: title,
    unitPrice: price,
    imageUrl: image.path,
    brand: { title: brand },
    description: { short: description },
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
    brand: { title: brand },
    description: { short: description },
    imageUrl: image?.path,
    categoryId: categoryId?.value,
  });
  await Product.findByIdAndUpdate({ _id: id }, newUpdateProduct);
  res.json({ updatedId: id });
}
