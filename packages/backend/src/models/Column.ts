import { Schema, model } from 'mongoose';

const columnSchema = new Schema<{ columnName: string; cards: [] | any }>({
  columnName: {
    type: String,
    required: true,
    unique: true
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todo-card'
    }
  ]
});

export const Column = model<{ columnName: string; cards: [] }>('todo-column', columnSchema);
