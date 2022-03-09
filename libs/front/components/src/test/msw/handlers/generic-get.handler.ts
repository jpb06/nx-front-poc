import { rest } from 'msw';

import { applyHandlerToServer } from './applyHandlerToServer';
import { GenericHandlerParams } from './types/generic-handler-params.type';

export const genericGetHandler = ({
  url,
  status,
  result,
  applyToServer = true,
}: GenericHandlerParams) => {
  const handler = rest.get(url, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};
