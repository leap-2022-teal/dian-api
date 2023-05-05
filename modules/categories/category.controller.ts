import { Request, Response } from 'express';
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

export async function createSubCategory(req: Request, res: Response) {
  const subCategories = req.body.filter((e: any) => {
    if (!e._id) {
      e._id = uuid();
      return e;
    }
  });

  Category.insertMany(subCategories)
    .then(function (docs) {
      res.status(200).json(docs);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

export async function createNewCategory(req: Request, res: Response) {
  const { title, subTitle } = req.body;

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
  const updated = await Category.findByIdAndUpdate({ _id: id }, { title });
  res.json({ updated: updated });
}
