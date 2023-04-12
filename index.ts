import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from 'express';
import mongoose from "mongoose";
import { categoriesRouter } from "./modules/categories/category.routes";

dotenv.config();

mongoose.connect(`${process.env.MONGODB_STRING}`).then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Dian project');
});

app.use("/categories" , categoriesRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});


