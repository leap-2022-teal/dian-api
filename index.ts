import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { productsRouter } from './modules/products/product.routes';

dotenv.config();

mongoose.connect(`${process.env.MONGODB_STRING}`).then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
