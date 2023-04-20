import { Router } from 'express';
import { createNewProductd, getProduct, singleProduct, updateProductById } from './product.controller';

const router = Router();

router.get('/', getProduct);
router.get('/:id', singleProduct)
router.post('/', createNewProductd)
router.put('/:id', updateProductById)

export const productsRouter = router;
