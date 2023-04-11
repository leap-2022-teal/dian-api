import axios from 'axios';
import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dian:Dian2022@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Dian project');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
