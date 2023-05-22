import { Router } from 'express';
import { getBrand } from './brand.controller';

const router = Router();

router.get('/', getBrand);

export const brandsRouter = router;
