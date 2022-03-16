import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@tests';
import { mockNextRouter, mockUseTranslation } from '@tests/mocks';

import { LangSelector } from './LangSelector';

describe('LangSelector component', () => {
  const { pushMock } = mockNextRouter();

  beforeAll(() => {
    mockUseTranslation('en');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<LangSelector />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should redirect the user when language is changed', async () => {
    render(<LangSelector />);

    const button = screen.getByText(/common:language.fr/i);
    userEvent.click(button);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should do nothing when we click on the current language', async () => {
    render(<LangSelector />);

    const button = screen.getByText(/common:language.en/i);
    userEvent.click(button);

    expect(pushMock).toHaveBeenCalledTimes(0);
  });
});
