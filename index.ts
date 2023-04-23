import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { categoriesRouter } from './modules/categories/category.routes';
import { productsRouter } from './modules/products/product.routes';
const multer = require('multer');
const cloudinary = require('cloudinary');
const { v4: uuid } = require('uuid');
import { usersRouter } from './modules/users/user.routes';

dotenv.config();

mongoose.connect(`${process.env.MONGODB_STRING}`).then(() => console.log('MongoDB Connected ✅'));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null, '/tmp');
  },
  filename: (_req: any, file: any, cb: any) => {
    const extentsions = file.originalname.split('.').pop();
    cb(null, `${uuid()}.${extentsions}`);
  },
});
const upload = multer({
  storage: storage,
});

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.get('/', (_req: Request, res: Response) => {
  res.send('Dian project');
});
app.post('/upload-image', upload.single('image'), async (req: any, res: any) => {
  const cloudinaryImage = await cloudinary.v2.uploader.upload(req.file.path);
  return res.json({
    path: cloudinaryImage.secure_url,
    width: cloudinaryImage.width,
    height: cloudinaryImage.height,
  });
});

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
