import { User } from './user.model';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function userRegistration(req: Request, res: Response) {
  const { email, password, confirmPassword }: any = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const checkEmail = await User.findOne({ email: email });

  if (!email) {
    res.status(400).json({ message: 'Хэрэглэгчийн нэрээ оруулна уу' });
  } else if (!password) {
    res.status(400).json({ message: 'Нууц үгээ оруулна уу' });
  } else if (password !== confirmPassword) {
    res.status(400).json({ message: 'Нууц үг таарахгүй байна' });
  } else if (checkEmail) {
    res.status(400).json({ message: 'Ийм нэртэй хэрэглэгч бүртгэгдсэн байна' });
  } else {
    const newUser = new User({
      _id: new ObjectId(),
      password: hashedPassword,
      email,
    });

    try {
      await newUser.save();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export async function userAuthentication(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log({ email, password });

  const one = await User.findOne({ email: email });
  if (one) {
    const auth = bcrypt.compareSync(password, one.password);
    if (auth) {
      const token = jwt.sign({ userId: one._id }, 'eyJhbGciOiJIUzI1');
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Буруу байна' });
    }
  } else {
    res.status(400).json({ message: 'Буруу байна' });
  }
}
