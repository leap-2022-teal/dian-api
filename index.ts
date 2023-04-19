import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { categoriesRouter } from './modules/categories/category.routes';
import { productsRouter } from './modules/products/product.routes';
import { usersRouter } from './modules/users/user.routes';

dotenv.config();

mongoose.connect(`${process.env.MONGODB_STRING}`).then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Dian project');
});

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
