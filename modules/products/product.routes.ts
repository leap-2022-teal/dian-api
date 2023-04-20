import { Router } from 'express';
import { createNewProductd, getProduct, singleCategory } from './product.controller';

const router = Router();

router.get('/', getProduct);
router.get('/', singleCategory)
router.post('/', createNewProductd)

export const productsRouter = router;
