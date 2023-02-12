import { Column } from '../models/column';
export default class ColumnService {
  async createColumn(payload: { columnName: string }) {
    const column = new Column();
    Object.assign(column, payload);
    return column.save();
  }

  async getAllColumns() {
    return Column.find();
  }

  async deleteColumn(columnName: string) {
    return Column.findOneAndDelete({ columnName: columnName });
  }

  async updateColumn(payload: { columnName: string }, columnId: string) {
    return Column.findByIdAndUpdate({ _id: columnId }, payload, { new: true });
  }
}
