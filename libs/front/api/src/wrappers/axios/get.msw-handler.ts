import { DefaultBodyType, rest } from 'msw';

import { mswHandlers } from '@tests';

export const genericGetUrl = 'https://cool.org/get';

export const getHandler = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) => {
  const handler = rest.get(genericGetUrl, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return mswHandlers.applyHandlerToServer(handler, applyToServer);
};
