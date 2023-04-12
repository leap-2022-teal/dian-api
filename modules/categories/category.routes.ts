import { Router } from "express";
import { getCategory } from "./category.controller";

const router = Router();

router.get('/', getCategory)


export const categoriesRouter = router 