import { Router } from 'express';
import { createNewCategory, deleteCategoryById, getCategory, getSubCategory, updateCategoryById } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.get('/:id', getSubCategory);
router.post('/', createNewCategory);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);

export const categoriesRouter = router;
