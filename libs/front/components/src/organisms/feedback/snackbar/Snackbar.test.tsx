import { AlertColor, Button } from '@mui/material';
import {
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import { useContext } from 'react';

import { appRender } from '../../../test/renders/appRender';
import { SnackbarContext } from './Snackbar.context';

type ClickerProps = { severity: AlertColor };

describe('Snackbar component', () => {
  const render = () => {
    const Clicker = ({ severity }: ClickerProps) => {
      const showSnackbar = useContext(SnackbarContext);

      const handleClick = () => {
        showSnackbar(`${severity} message`, severity);
      };

      return <Button onClick={handleClick}>{severity}</Button>;
    };

    const SnackbarWrapper = () => (
      <>
        <Clicker severity="error" />
        <Clicker severity="info" />
        <Clicker severity="success" />
        <Clicker severity="warning" />
      </>
    );

    return appRender(<SnackbarWrapper />, { providers: ['snackbar'] });
  };

  it.each([
    ['error', 'ErrorOutlineIcon'],
    ['info', 'InfoOutlinedIcon'],
    ['success', 'SuccessOutlinedIcon'],
    ['warning', 'ReportProblemOutlinedIcon'],
  ])('%s', async (severity, iconId) => {
    render();

    const button = screen.getByRole('button', { name: severity });
    fireEvent.click(button);

    await screen.findByText(`${severity} message`);
    expect(screen.getByTestId(iconId)).toBeInTheDocument();
  });

  it('should display a warning and then an error', async () => {
    render();

    const warningButton = screen.getByRole('button', { name: /warning/i });
    fireEvent.click(warningButton);

    await screen.findByText(/warning message/i);
    expect(screen.getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();

    const errorButton = screen.getByRole('button', { name: /error/i });
    fireEvent.click(errorButton);

    await screen.findByText(/error message/i);
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  it('should close a displayed snackbar', async () => {
    render();

    const warningButton = screen.getByRole('button', {
      name: /warning/i,
    });
    fireEvent.click(warningButton);

    await screen.findByText(/warning message/i);
    expect(screen.getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/warning message/i)
    );
  });
});
