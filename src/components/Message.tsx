import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useToastStore } from '../Store/toastStore';

const GlobalToast = () => {
  const {
    open,
    message,
    variant,
    hideMessage,
  } = useToastStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideMessage}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        severity={variant}
        onClose={hideMessage}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalToast;