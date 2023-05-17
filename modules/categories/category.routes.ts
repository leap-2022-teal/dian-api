import { Router } from 'express';
import { createNewCategory, createSubCategory, deleteCategoryById, deleteSubCategoryById, getCategory, getCategoryId, getSubCategory, getSubCategoryId, updateCategoryById } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.get('/subCategory/:id', getSubCategoryId);
router.get('/:id', getCategoryId);
router.get('/subCategory', getSubCategory);
router.post('/', createNewCategory);
router.post('/subCategory', createSubCategory);
router.delete('/subCategory/:id', deleteSubCategoryById);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);

export const categoriesRouter = router;
