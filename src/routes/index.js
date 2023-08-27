import { Router } from 'express';
const router = Router();

import productRouter from './productsRouter.js';
import userRouter from './userRouter.js';

router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;