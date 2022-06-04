import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

export const applyHandlerToServer = (
  handler: RestHandler<MockedRequest<DefaultBodyType>>,
  useServer: boolean
) => {
  if (useServer) {
    const { mswServer } = require('./../mswServer');
    return mswServer.use(handler);
  }

  return handler;
};
