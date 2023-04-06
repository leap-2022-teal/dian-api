import axios from 'axios';
import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dian:dzj0jRzEofkDNyZb@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = 3535;



app.get("/data",(req,res)=>{
  axios.get(`https://api.hitech.mn/api/products/?category=7b0e308a-1e0e-4761-a805-06c1845d5562&limit=16&offset=0`)
  .then(async function (response) {
    console.log(response.data);
    // const categorySchema = new mongoose.Schema({}, { strict: false })
    //     const TestCollection = mongoose.model('category', categorySchema)
    //     let body = response?.data
    //     const testCollectionData = new TestCollection(body)
    //     await testCollectionData.save()
        return res.send(
            response.data?.data
        )
    
  })
  .catch(function (error) {
    console.log(error);
  });
})


app.get('/', (req: Request, res: Response) => {
res.send('Dian project');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port} 🎉`);
});
