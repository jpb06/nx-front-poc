import { AlertColor, Button } from '@mui/material';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';

import { SnackbarContext, WithSnackbar } from '..';
import { render } from '../../test';

const SnackbarWrapper: React.FC = () => (
  <WithSnackbar>
    <Clicker severity="error" />
    <Clicker severity="info" />
    <Clicker severity="success" />
    <Clicker severity="warning" />
  </WithSnackbar>
);

const Clicker: React.FC<{ severity: AlertColor }> = ({ severity }) => {
  const showSnackbar = useContext(SnackbarContext);

  const handleClick = () => {
    showSnackbar(`${severity} message`, severity);
  };

  return <Button onClick={handleClick}>{severity}</Button>;
};

describe('Snackbar component', () => {
  it.each([
    ['error', 'ErrorOutlineIcon'],
    ['info', 'InfoOutlinedIcon'],
    ['success', 'SuccessOutlinedIcon'],
    ['warning', 'ReportProblemOutlinedIcon'],
  ])('%s', (severity, iconId) => {
    render(<SnackbarWrapper />);

    const button = screen.getByRole('button', { name: severity });
    userEvent.click(button);

    expect(screen.getByText(`${severity} message`)).toBeInTheDocument();
    expect(screen.getByTestId(iconId)).toBeInTheDocument();
  });

  it('should display a warning and then an error', async () => {
    render(<SnackbarWrapper />);

    userEvent.click(screen.getByRole('button', { name: 'warning' }));

    expect(screen.getByText('warning message')).toBeInTheDocument();
    expect(screen.getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'error' }));

    await screen.findByText('error message');
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  it('should close a displayed snackbar', async () => {
    render(<SnackbarWrapper />);

    userEvent.click(screen.getByRole('button', { name: 'warning' }));

    expect(screen.getByText('warning message')).toBeInTheDocument();
    expect(screen.getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('warning message')
    );
  });
});
