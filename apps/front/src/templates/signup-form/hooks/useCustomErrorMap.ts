import { useTranslation } from 'next-i18next';
import { ZodErrorMap, ZodIssueOptionalMessage } from 'zod';

export type ErrorMapCtx = {
  defaultError: string;
  data: unknown;
};

export const useCustomErrorMap: () => ZodErrorMap = () => {
  const { t } = useTranslation('forms');

  return (issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx) => {
    if (issue.message) {
      return {
        message: issue.message,
      };
    }

    if (issue.code === 'invalid_type' && issue.received === 'undefined') {
      if (ctx.defaultError) {
        return {
          message: ctx.defaultError,
        };
      }

      return { message: t('generic.information_required') };
    }

    switch (issue.code) {
      case 'invalid_date': {
        return { message: t('generic.invalid_date') };
      }
      case 'too_small': {
        return { message: t('generic.too_small') };
      }
      case 'too_big': {
        return { message: t('generic.too_big') };
      }
      case 'invalid_type': {
        return { message: t('generic.invalid_type') };
      }
      default: {
        if (ctx.defaultError) {
          return {
            message: ctx.defaultError,
          };
        }

        return { message: t('generic.incorrect_value') };
      }
    }
  };
};
