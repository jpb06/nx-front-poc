import { DefaultRequestBody } from 'msw';

export type GenericHandlerParams = {
  url: string;
  status: number;
  result: DefaultRequestBody;
  applyToServer?: boolean;
};
