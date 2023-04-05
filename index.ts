import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dian:cf59aa39958d@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = 8080;

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAt: Date,
});
const User = mongoose.model('User', userSchema);

app.get('/test-mongoose', (req, res) => {
  const user = User.create({
    name: 'Bold',
    age: 18,
    createdAt: new Date(),
  });

  res.json(user);
});

app.get('/', (req: Request, res: Response) => {
res.send('Dian project');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
