import { rest } from 'msw';

import { getUrl } from '../../wrappers/react-query/get-url';
import { applyHandlerToServer } from './applyHandlerToServer';
import { GenericHandlerParams } from './types/generic-handler-params.type';

export const genericPostHandler = ({
  backend,
  path,
  status,
  result,
  applyToServer = true,
}: GenericHandlerParams) => {
  const url = getUrl(backend, path);

  const handler = rest.post(url, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};
