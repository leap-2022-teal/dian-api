import { User } from './user.model';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';

export async function userRegister(req: Request, res: Response) {
  const { email, password }: any = req.body;

  console.log(req.body);
  const newUser = new User({
    _id: new ObjectId(),
    password,
    email,
  });

  const result = await newUser.save();
  res.sendStatus(200);
}
