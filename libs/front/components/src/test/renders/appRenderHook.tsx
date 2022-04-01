import {
  renderHook,
  RenderHookResult,
  WrapperComponent,
} from '@testing-library/react-hooks';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRenderHook = <TForm, TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: ApplyWrappersProps<TForm>
): RenderHookResult<TProps, TResult> => {
  const wrapper = applyWrappers(options);

  return renderHook(callback, {
    wrapper: wrapper as WrapperComponent<TProps>,
  });
};
