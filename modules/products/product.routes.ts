import { Router } from 'express';
import { createNewProductd, deleteProductById, getFilteredProduct, getProduct, singleProduct, updateProductById } from './product.controller';

const router = Router();

router.get('/', getProduct);
router.get('/:id', singleProduct)
router.post('/', createNewProductd)
router.delete('/:id', deleteProductById)
router.put('/:id', updateProductById)
router.post("/filter", getFilteredProduct)

export const productsRouter = router;
