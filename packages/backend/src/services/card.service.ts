import { Card } from '../models/card';
import { Column } from '../models/column';
export default class CardService {
  async createCard(payload: { cardName: string; id: string }) {
    const card = new Card();
    Object.assign(card, payload);
    const savedData = await card.save();
    await Column.findOneAndUpdate({ _id: payload.id }, { $push: { cards: savedData._id } });
    return savedData;
  }

  async deleteCard(cardName: string) {
    return Card.findOneAndDelete({ cardName: cardName });
  }

  async updateCard(payload: { cardName: string }, cardId: string) {
    return Card.findByIdAndUpdate({ _id: cardId }, payload, { new: true });
  }
}
