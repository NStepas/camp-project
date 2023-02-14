export interface IColumnCreate {
  name: string;
}

export interface IColumnResponse {
  id: string;
  name: string;
  card?: [];
}

export interface IColumnDelete {
  name: string;
}

export interface IColumnUpdate {
  name: string;
  columnId: string;
}
