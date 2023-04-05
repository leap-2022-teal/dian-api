import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8001;

app.get('/', (req: Request, res: Response) => {
res.send('Dian project + changed branch');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
});
