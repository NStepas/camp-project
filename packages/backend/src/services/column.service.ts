import { Column } from '../models/column';
export default class ColumnService {
  async createColumn(payload: { columnName: string }, counts: number) {
    const column = new Column();
    Object.assign(column, payload);
    column.order = counts;
    return column.save();
  }

  async getAllColumns() {
    return Column.find().populate('cards').sort({ order: 0 });
  }

  async getAllColumnsWithoutPopulate() {
    return Column.find().countDocuments();
  }

  async deleteColumn(columnName: string) {
    return Column.findOneAndDelete({ columnName: columnName });
  }

  async updateColumn(payload: { columnData: string }, columnId: string) {
    return Column.findByIdAndUpdate(
      { _id: columnId },
      { columnName: payload.columnData },
      { new: true }
    );
  }

  async getColumnByIndexAndUpdate(payload: { newIndex: number; oldIndex: number }) {
    return Column.findOneAndUpdate(
      { order: payload.newIndex },
      { order: payload.oldIndex },
      { new: true }
    );
  }

  async updateColumnOrder(payload: { columnId: string; newIndex: number; oldIndex: number }) {
    const updatedColumnIndex = await Column.findByIdAndUpdate(
      { _id: payload.columnId },
      { order: payload.newIndex }
    );
    if (updatedColumnIndex) {
      return this.getAllColumns();
    }
    return null;
  }
}
