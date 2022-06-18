import { ZodIssueOptionalMessage } from 'zod';

import { appRenderHook } from '@front/tests/render';

import { ErrorMapCtx, useCustomErrorMap } from './useCustomErrorMap';

describe('useCustomErrorMap hook', () => {
  const renderHook = (
    zodIssueOptionalMessage: unknown,
    errorMapContext: unknown
  ) =>
    appRenderHook(() =>
      useCustomErrorMap()(
        zodIssueOptionalMessage as ZodIssueOptionalMessage,
        errorMapContext as ErrorMapCtx
      )
    );

  it('should return issue message when it is defined', () => {
    const message = 'cool';
    const { result } = renderHook({ message }, {});

    expect(result.current.message).toBe(message);
  });

  it('should return context default error when issue message is not defined', () => {
    const message = 'cool';
    const { result } = renderHook(
      {},
      {
        defaultError: message,
      }
    );

    expect(result.current.message).toBe(message);
  });

  it('should return information required when invalid_type code is provided', () => {
    const { result } = renderHook(
      {
        code: 'invalid_type',
        received: 'undefined',
      },
      {}
    );

    expect(result.current.message).toBe('forms:generic.information_required');
  });

  it.each([['invalid_date'], ['too_small'], ['too_big'], ['invalid_type']])(
    '%s',
    (type) => {
      const { result } = renderHook({ code: type }, {});

      expect(result.current.message).toBe(`forms:generic.${type}`);
    }
  );

  it('should return incorrect value when code has a random value', () => {
    const { result } = renderHook(
      {
        code: 'yolo',
      },
      {}
    );

    expect(result.current.message).toBe('forms:generic.incorrect_value');
  });
});
