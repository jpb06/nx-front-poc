import { ZodIssueOptionalMessage } from 'zod';

import { renderHook } from '@tests/render';

import { ErrorMapCtx, useCustomErrorMap } from './useCustomErrorMap';

describe('useCustomErrorMap hook', () => {
  it('should return issue message when it is defined', () => {
    const message = 'cool';
    const { result } = renderHook(() =>
      useCustomErrorMap()(
        { message } as ZodIssueOptionalMessage,
        {} as ErrorMapCtx
      )
    );

    expect(result.current.message).toBe(message);
  });

  it('should return context default error when issue message is not defined', () => {
    const message = 'cool';
    const { result } = renderHook(() =>
      useCustomErrorMap()(
        {} as ZodIssueOptionalMessage,
        {
          defaultError: message,
        } as ErrorMapCtx
      )
    );

    expect(result.current.message).toBe(message);
  });

  it('should return information required when invalid_type code is provided', () => {
    const { result } = renderHook(() =>
      useCustomErrorMap()(
        {
          code: 'invalid_type',
          received: 'undefined',
        } as ZodIssueOptionalMessage,
        {} as ErrorMapCtx
      )
    );

    expect(result.current.message).toBe('forms:generic.information_required');
  });

  it.each([['invalid_date'], ['too_small'], ['too_big'], ['invalid_type']])(
    '%s',
    (type) => {
      const { result } = renderHook(() =>
        useCustomErrorMap()(
          { code: type } as ZodIssueOptionalMessage,
          {} as ErrorMapCtx
        )
      );

      expect(result.current.message).toBe(`forms:generic.${type}`);
    }
  );

  it('should return incorrect value when code has a random value', () => {
    const { result } = renderHook(() =>
      useCustomErrorMap()(
        {
          code: 'yolo',
        } as unknown as ZodIssueOptionalMessage,
        {} as ErrorMapCtx
      )
    );

    expect(result.current.message).toBe('forms:generic.incorrect_value');
  });
});
