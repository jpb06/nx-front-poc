import { ShowSnackbarFn } from '@front/components/feedback';

export const handleMutationsErrors =
  (showSnackbar: ShowSnackbarFn) => (error: unknown) => {
    const message = (error as { message?: string | Array<string> }).message;

    if (Array.isArray(message)) {
      showSnackbar(message.join(','), 'error');
    } else {
      showSnackbar(
        message || 'Oh no! Something terrible happened ...',
        'error'
      );
    }
  };
