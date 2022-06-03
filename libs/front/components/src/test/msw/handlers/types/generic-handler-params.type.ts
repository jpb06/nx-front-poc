import { DefaultBodyType } from 'msw';

export type GenericHandlerParams = {
  url: string;
  status: number;
  result: DefaultBodyType;
  applyToServer?: boolean;
};
