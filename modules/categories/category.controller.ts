import { Request, Response } from 'express';
import { Category } from './category.model';
import { ObjectId } from 'mongodb';

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
  console.log(id);
  await Category.findByIdAndDelete({ _id: id });
  res.json({ deletedId: id });
}
