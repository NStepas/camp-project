import { Schema, model } from 'mongoose';

const userSchema = new Schema<{ name: string; email: string; password: string }>({
  name: {
    type: String,
    requried: true,
    unique: true
  },
  email: {
    type: String,
    requried: true,
    unique: true
  },
  password: {
    type: String,
    requried: true
  }
});
userSchema.set('timestamps', true);

export const User = model<{ name: string; email: string; password: string }>('User', userSchema);
