import { Router } from 'express';
import { createNewCategory, deleteCategoryById, deleteSubCategoryById, getCategory, getSubCategory, getSubCategoryId, updateCategoryById } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.get('/subCategory', getSubCategory);
router.delete('/subCategory/:id', deleteSubCategoryById);
router.get('/:id', getSubCategoryId);
router.post('/', createNewCategory);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);

export const categoriesRouter = router;
