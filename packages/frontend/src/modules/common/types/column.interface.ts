export interface IColumnCreate {
  name: string;
}

export interface IColumnUpdate {
  id: string;
  name: string;
}
export interface IColumnResponse {
  id: string;
  name: string;
  card?: [];
}

export interface ICardData {
  card: [id: string, name: string];
}

export interface IColumnDelete {
  name: string;
}
