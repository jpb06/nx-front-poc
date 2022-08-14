import { renderHook, RenderHookResult } from '@testing-library/react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRenderHook = <TForm, TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: ApplyWrappersProps<TForm>
): RenderHookResult<TResult, TProps> => {
  const wrapper = applyWrappers(options);

  return renderHook(callback, {
    wrapper,
  });
};
