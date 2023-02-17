import { Schema, model } from 'mongoose';

const cardSchema = new Schema<{ cardName: string; column: Object | any; columnId: string }>({
  cardName: {
    type: String,
    required: true,
    unique: true
  },
  columnId: {
    type: String,
    unique: true
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: 'todo-column'
  }
});

export const Card = model<{ cardName: string; column: Object | any; columnId: string }>(
  'todo-card',
  cardSchema
);
