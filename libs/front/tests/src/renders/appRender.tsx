import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup';
import { ReactElement } from 'react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export interface AppRenderResult extends RenderResult {
  user: UserEvent;
}

export const appRender = <TForm,>(
  ui: ReactElement,
  options?: ApplyWrappersProps<TForm>
): AppRenderResult => {
  const wrapper = applyWrappers(options);

  const withUser = {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper,
    }),
  };

  return withUser;
};
