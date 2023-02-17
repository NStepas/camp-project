import { Schema, model } from 'mongoose';

const columnSchema = new Schema<{ columnName: string; cards: [] | any; order: number }>({
  columnName: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: Number,
    default: 0
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todo-card'
    }
  ]
});

export const Column = model<{ columnName: string; cards: [] | any; order: number }>(
  'todo-column',
  columnSchema
);
