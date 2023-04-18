import { Router } from 'express';
import { createNewCategory, deleteCategoryById, getCategory } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.post('/', createNewCategory);
router.delete('/:id', deleteCategoryById);

export const categoriesRouter = router;
