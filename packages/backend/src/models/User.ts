import { Schema, model } from 'mongoose';

const userSchema = new Schema<{ name: string; email: string; password: string }>({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

export const User = model<{ name: string; email: string; password: string }>('User', userSchema);
