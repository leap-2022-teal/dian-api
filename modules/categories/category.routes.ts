import { Router } from 'express';
import { createNewCategory, createSubCategory, deleteCategoryById, deleteSubCategoryById, getCategory, getSubCategory, getSubCategoryId, updateCategoryById } from './category.controller';

const router = Router();

router.get('/', getCategory);
router.get('/:id', getSubCategoryId);
router.get('/subCategory', getSubCategory);
router.post('/', createNewCategory);
router.post('/subCategory', createSubCategory);
router.delete('/subCategory/:id', deleteSubCategoryById);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);

export const categoriesRouter = router;
