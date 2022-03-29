import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRender = <TForm,>(
  ui: ReactElement,
  options?: ApplyWrappersProps<TForm>
): RenderResult => {
  const wrapper = applyWrappers(options);

  return render(ui, {
    wrapper,
  });
};
