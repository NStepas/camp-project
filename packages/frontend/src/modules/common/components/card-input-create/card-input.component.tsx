import { useState } from 'react';
import { useMutation } from 'react-query';

import { Container } from '@mui/system';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFormik } from 'formik';

import { CardTextFieldWrapper } from './card-input.styles';
import { ErrorSnackbar } from '../error-snackbar/error-snackbar.component';
import {
  ICardDelete,
  ICardResponse,
  ICardUpdate,
  IStyledInputProps
} from '../../types/card.interfaces';
import { CARD_QUERY_KEY } from '../../constants/app-keys.const';
import { deleteCardFn, updateCardFn } from '../../../cards/services/card.services';
import { validate } from '../../../cards/validation/card-validation';
import { initialCardValue } from '../../constants/form-validation-constants';
import { ColorMithril } from '../../constants/card.styles';

export const StyledCard = (props: IStyledInputProps | any) => {
  const [cardError, setCardError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [value, setValue] = useState();

  const values = { name: value, cardId: props._id };

  const updateCardMutation = useMutation(
    CARD_QUERY_KEY,
    (values: ICardUpdate) => updateCardFn(values as any),
    {
      CARD_QUERY_KEY,
      // onSuccess: async (cardData: ICardResponse[]) => {
      //   setCardData(cardData);
      // },

      onError: (data: any) => {
        setCardError(data.response?.data?.message);
      }
    } as ICardResponse | any
  );

  const handleSubmit = async () => {
    updateCardMutation.mutate(values as any);
  };

  const deleteCardMutation = useMutation(
    CARD_QUERY_KEY,
    (values: ICardDelete) => deleteCardFn(values as any),
    {
      CARD_QUERY_KEY,
      onSuccess: async (cardData: ICardResponse[]) => {
        setCardData(cardData);
      },

      onError: (data: any) => {
        setCardError(data.response?.data?.message);
      }
    } as ICardResponse | any
  );

  const deleteCard = async () => {
    deleteCardMutation.mutate(props.cardName);
  };

  const handleKeySubmit = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return handleSubmit();
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (values: any) => {
    setTimeout(() => {
      setValue(values.target.value);
    }, 500);
  };

  const formik = useFormik({
    initialValues: initialCardValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  return (
    <Container sx={{ paddingBottom: '0.2rem', marginRight: '1rem' }}>
      <form
        onSubmit={formik.handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeySubmit}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <CardTextFieldWrapper
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="delete" name={props.cardName} onClick={deleteCard}>
                  <DeleteOutlineIcon sx={ColorMithril} />
                </IconButton>
              </InputAdornment>
            )
          }}
          id="outlined"
          variant="standard"
          defaultValue={props.cardName}
          onKeyPress={handleKeySubmit as any}
        />
        {cardError && (
          <ErrorSnackbar
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            errorMessage={cardError}
          />
        )}
      </form>
    </Container>
  );
};
