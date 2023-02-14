import { Schema, model } from 'mongoose';


const cardSchema = new Schema<{ cardName: string, column: Object | any }>({
    cardName: {
        type: String,
        required: true,
        unique: true
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'todo-column'
    }
});

export const Card = model<{ cardName: string,  column: Object | any }>('todo-card', cardSchema);
