import { Router } from 'express';
import { getProduct } from './product.controller';

const router = Router();

router.get('/', getProduct);

export const productsRouter = router;
