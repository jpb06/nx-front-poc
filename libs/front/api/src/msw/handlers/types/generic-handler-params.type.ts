import { DefaultBodyType } from 'msw';

import { Backend } from '../../../wrappers/react-query/types/backend.type';

export type GenericHandlerParams = {
  backend: Backend;
  path: string;
  status: number;
  result: DefaultBodyType;
  applyToServer?: boolean;
};
