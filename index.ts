import axios from 'axios';
import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dian:dzj0jRzEofkDNyZb@cluster0.m5m6cex.mongodb.net/project').then(() => console.log('MongoDB Connected ✅'));

const app: Express = express();
const port = 8000;



app.get("/data",(req,res)=>{
  axios.get(`https://api.hitech.mn/api/menu/category${}`)
  .then(async function (response) {
    console.log(response.data[0].sub_menu[0]);
    // const categorySchema = new mongoose.Schema({}, { strict: false })
    //     const TestCollection = mongoose.model('category', categorySchema)
    //     let body = response?.data
    //     const testCollectionData = new TestCollection(body)
    //     await testCollectionData.save()
        return res.send(
            response.data
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
