import { Alert, Snackbar } from '@mui/material';

interface IErrorSnackbarProps {
  onClose?: React.ChangeEventHandler<HTMLInputElement>;
  open: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  errorMessage: string;
}

export const ErrorSnackbar = ({ onClose, open, onClick, errorMessage }: IErrorSnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={1000} onClick={onClick}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
