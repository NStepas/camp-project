import {
  ICardUpdate,
  ICardDelete,
  ICardCreate,
  ICardResponse
} from '../../common/types/card.interfaces';
import { mainApi, localStorageUserData } from '../../common/services/main.services';

const localStorageData = JSON.parse(localStorageUserData);
const token = localStorageData.token;

export const createCardFn = async (cardData: ICardCreate) => {
  const response = await mainApi.post<ICardResponse>(
    '/card',
    { cardName: cardData.name, id: cardData.id },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const dndCardFn = async (cardData: ICardUpdate | any) => {
  const response = await mainApi.patch<ICardResponse>(
    `/card`,
    {
      columnId: cardData.draggableId,
      oldIndex: cardData.source.index,
      newIndex: cardData.destination.index
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateCardFn = async (cardData: ICardUpdate) => {
  const response = await mainApi.put<ICardResponse>(
    `/card/${cardData.cardId}`,
    { cardName: cardData.name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteCardFn = async (cardName: ICardDelete) => {
  const response = await mainApi.delete<boolean>('/card', {
    data: { cardName },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
