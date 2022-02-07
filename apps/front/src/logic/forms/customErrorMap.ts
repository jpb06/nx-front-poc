import { ZodIssueOptionalMessage } from 'zod';

import { translationsKeys } from '@translations';

type ErrorMapCtx = {
  defaultError: string;
  data: unknown;
};

type ErrorMapResult = {
  message: string;
};

export const customErrorMap = (
  issue: ZodIssueOptionalMessage,
  ctx: ErrorMapCtx
): ErrorMapResult => {
  if (issue.message && translationsKeys.includes(issue.message)) {
    return {
      message: issue.message,
    };
  }

  if (translationsKeys.includes(ctx.defaultError)) {
    return {
      message: ctx.defaultError,
    };
  }

  return { message: issue.code || 'genericError' };
};
