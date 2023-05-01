import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { Category } from './category.model';
const { v4: uuid } = require('uuid');

export async function getCategory(req: Request, res: Response) {
  const list = await Category.find({ parentId: { $exists: false } }).sort({ number: 1 });
  res.json(list);
}

export async function getSubCategoryId(req: Request, res: Response) {
  const { id } = req.params;
  const one = await Category.find({ parentId: id });
  res.json(one);
}

export async function getSubCategory(req: Request, res: Response) {
  const list = await Category.find({ parentId: { $exists: true } });
  res.json(list);
}

export async function deleteSubCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  await Category.findOneAndDelete({ _id: id });
  res.json({ deletedId: id });
}

export async function createNewCategory(req: Request, res: Response) {
  const { title, subTitle, subCategories } = req.body;

  console.log(subCategories);
  if (subCategories) {
    const subCategory1 = new Category({
      _id: uuid(),
      title: subCategories,
      // parentId
    });

    const result = await subCategory1.save();
  } else {
    const newCategory = new Category({
      _id: uuid(),
      title: title.value,
    });

    const subCategory = new Category({
      _id: uuid(),
      title: subTitle,
      parentId: newCategory._id,
    });

    const result = await Category.insertMany([newCategory, subCategory]);
  }

  // const result = await newCategory.save();
  res.sendStatus(200);
}

export async function deleteCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  await Category.findByIdAndDelete({ _id: id });
  res.json({ deletedId: id });
}

export async function updateCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const { title } = req.body;
  await Category.findByIdAndUpdate({ _id: id }, title);
  // await Category.findByIdAndUpdate({ parentId: id }, subTitle);
  res.json({ updatedId: id });
}
