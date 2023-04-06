import axios from 'axios';
import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dian:Dian2022@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = 8000;

let endpoints = [
  `https://api.hitech.mn/api/categories/6ac583ed-76c9-419a-9b2f-df3290cf6bc1`,
  `https://api.hitech.mn/api/categories/b4a6f30a-6f30-44d4-8e3c-922547361857`,
  `https://api.hitech.mn/api/categories/642a9ec6-668e-46f7-9701-5b2ef9dc3e36`,
  `https://api.hitech.mn/api/categories/dc222884-ecc3-4b9a-ace9-e9a863129df7`,
  `https://api.hitech.mn/api/categories/a81c5bd2-4820-4801-93c7-b85dfc89cab9`,
  `https://api.hitech.mn/api/categories/45fe6a0e-33db-4e40-8a4f-e789e86ff63d`,
]



mongoose.connect('mongodb+srv://Dian:Dian2022@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const exampleSchema = new mongoose.Schema({}, { strict: false });

const TestCollection = mongoose.model('example', exampleSchema);

app.get("/oyu", (req,res)=> {
axios.all(endpoints.map(endpoint => axios.get(endpoint)))
  .then(responses => {
    responses.forEach(response => {
      const testCollectionData = new TestCollection(response.data);
      testCollectionData.save();
    });
    console.log('Data added to database');
  })
  .catch(error => {
    console.error(error);
  });
})


app.get('/', (req: Request, res: Response) => {
res.send('Dian project');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
