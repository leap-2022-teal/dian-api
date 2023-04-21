import { Router } from 'express';
import { createNewProductd, deleteProductById, getProduct, singleProduct, updateProductById } from './product.controller';

const router = Router();

router.get('/', getProduct);
router.get('/:id', singleProduct)
router.post('/', createNewProductd)
router.delete('/:id', deleteProductById)
router.put('/:id', updateProductById)

export const productsRouter = router;
