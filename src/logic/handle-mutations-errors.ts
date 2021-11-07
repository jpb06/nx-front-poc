import { ShowSnackbarFn } from '@components/generic/feedback/snackbar/Snackbar.context';

export const handleMutationsErrors =
  (showSnackbar: ShowSnackbarFn) => (error: any) => {
    const errorMessage = error.message || 'Oh no! Somthing bad happened ...';
    const message = Array.isArray(errorMessage)
      ? (errorMessage as Array<string>).join(',')
      : (errorMessage as string);
    showSnackbar(message, 'error');
  };
