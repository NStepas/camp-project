import { Card } from '../models/card';
import { Column } from '../models/column';
export default class CardService {
  async createCard(payload: { cardName: string; id: string }) {
    const card = new Card();
    Object.assign(card, payload);
    card.columnId = payload.id;
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

  async getOneCard(cardId: string, columnId: string) {
    const card = await Card.findById(cardId);
    if (card) {
      await this.updateOnceCard(cardId, columnId);
      return card.columnId;
    }
    return null;
  }

  async updateOnceCard(cardId: string, columnId: string) {
    return Card.findByIdAndUpdate({ _id: cardId }, { columnId: columnId });
  }

  async updateCardColumnId(payload: { cardId: string; columnId: string }, oldColumnId: string) {
    await this.removeColumnItem(oldColumnId, payload.cardId);
    const savedCard = await Card.findByIdAndUpdate(
      { _id: payload.cardId },
      { column: payload.columnId },
      { new: true }
    ).populate('cards');
    await this.addColumnItem(payload.columnId, payload.cardId);
    return savedCard;
  }

  async removeColumnItem(columnId: string, cardId: string) {
    return Column.findOneAndUpdate({ _id: columnId }, { $pull: { cards: cardId } });
  }

  async addColumnItem(columnId: string, cardId: string) {
    return Column.findOneAndUpdate({ _id: columnId }, { $push: { cards: cardId } });
  }
}
