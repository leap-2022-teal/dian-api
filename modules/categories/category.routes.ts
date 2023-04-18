import { Router } from 'express';
import { createNewCategory, getCategory } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.post('/', createNewCategory);

export const categoriesRouter = router;
