import { Router } from 'express';
import { createNewProductd, getProduct } from './product.controller';

const router = Router();

router.get('/', getProduct);
router.post('/', createNewProductd)

export const productsRouter = router;
