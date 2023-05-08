import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: String;
  password: String;
  role?: { type: string; enum: ['admin', 'user'] };
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: [true, 'Email хаягаа оруулна уу'] },
  password: { type: String, required: [true, 'Нууц үгээ оруулна уу'] },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
});

export const User = model<IUser>('users', userSchema);
