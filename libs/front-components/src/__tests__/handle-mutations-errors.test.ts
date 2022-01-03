import { handleMutationsErrors } from "../utils/handle-mutations-errors";

describe('handleMutationsErrors function', () => {
  const showSnackbarFnMock = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('should call the snackbar function with the error message', () => {
    const message = 'Oh no!';
    handleMutationsErrors(showSnackbarFnMock)(new Error(message));

    expect(showSnackbarFnMock).toHaveBeenCalledTimes(1);
    expect(showSnackbarFnMock).toHaveBeenCalledWith(message, 'error');
  });

  it('should call the snackbar function with a default error message', () => {
    handleMutationsErrors(showSnackbarFnMock)(new Error());

    expect(showSnackbarFnMock).toHaveBeenCalledTimes(1);
    expect(showSnackbarFnMock).toHaveBeenCalledWith(
      'Oh no! Something terrible happened ...',
      'error'
    );
  });

  it('should call the snackbar function with all the provided errors joined in a string', () => {
    handleMutationsErrors(showSnackbarFnMock)({ message: ['Oh', 'no', '!'] });

    expect(showSnackbarFnMock).toHaveBeenCalledTimes(1);
    expect(showSnackbarFnMock).toHaveBeenCalledWith('Oh,no,!', 'error');
  });
});
