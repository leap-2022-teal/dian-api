import { Request, Response } from "express"
import { Category } from "./category.model"


export async function getCategory (req: Request, res:Response) {
  const list = await Category.find({}, {title: 1})
  res.json(list)
  
}