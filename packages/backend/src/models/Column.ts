import { Schema, model } from 'mongoose';

const columnSchema = new Schema<{ columnName: string }>({
  columnName: {
    type: String,
    required: true,
    unique: true
  }
});

export const Column = model<{ columnName: string }>('TaskColumn', columnSchema);
