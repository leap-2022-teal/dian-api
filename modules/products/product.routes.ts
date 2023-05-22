import { Router } from 'express';
import {
  categoryProduct,
  createNewProductd,
  deleteProductById,
  getFilteredProduct,
  getFilteredProductPagination,
  getNewProduct,
  getProduct,
  getProductPagination,
  getSpecialProduct,
  singleProduct,
  updateProductById,
} from './product.controller';

const router = Router();

router.get('/', getProduct);
router.get('/:id', singleProduct);
router.get('/build/:id', categoryProduct);
router.get('/special', getSpecialProduct);
router.get('/new', getNewProduct);
router.get('/pagination', getProductPagination);
router.get('/build/:id', categoryProduct);
router.get('/:id', singleProduct);
router.delete('/:id', deleteProductById);
router.put('/:id', updateProductById);
router.post('/', createNewProductd);
router.post('/filter', getFilteredProduct);
router.post('/filter/pagination', getFilteredProductPagination);

export const productsRouter = router;
