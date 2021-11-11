import { ShowSnackbarFn } from '@components/generic/feedback/snackbar/Snackbar.context';

export const handleMutationsErrors =
  (showSnackbar: ShowSnackbarFn) =>
  (error: { message: string | Array<string> }) => {
    if (Array.isArray(error.message)) {
      showSnackbar(error.message.join(','), 'error');
    } else {
      showSnackbar(
        error.message || 'Oh no! Something terrible happened ...',
        'error'
      );
    }
  };
