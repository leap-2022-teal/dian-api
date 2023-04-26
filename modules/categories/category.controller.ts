import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Category } from './category.model';

export async function getCategory(req: Request, res: Response) {
  const list = await Category.find({}, { title: 1 });
  res.json(list);
}

export async function createNewCategory(req: Request, res: Response) {
  const { title } = req.body;
  const newCategory = new Category({
    _id: new ObjectId(),
    title: title,
  });

  const result = await newCategory.save();
  res.sendStatus(200);
}

export async function deleteCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  await Category.findByIdAndDelete({ _id: id });
  res.json({ deletedId: id });
}

export async function updateCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedCategory = req.body;
  await Category.findByIdAndUpdate({ _id: id }, updatedCategory);
  res.json({ updatedId: id });
}
