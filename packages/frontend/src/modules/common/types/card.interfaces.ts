export interface ICardCreate {
  name: string;
  id: string;
}

export interface ICardDelete {
  name: string;
}

export interface ICardUpdate {
  name: string;
  cardId: string;
}

export interface ICardResponse {
  id: string;
  name: string;
}

export interface IStyledInputProps {
  defaultValue: string;
}
