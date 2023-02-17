import { Alert, Snackbar } from '@mui/material';

interface IErrorSnackbarProps {
  onClose?: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  errorMessage: string;
}

export const ErrorSnackbar = ({ onClose, onClick, errorMessage }: IErrorSnackbarProps) => {
  return (
    <Snackbar autoHideDuration={1000} onClick={onClick}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
