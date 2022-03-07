import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';

export const applyHandlerToServer = (
  handler: RestHandler<MockedRequest<DefaultRequestBody>>,
  useServer: boolean
) => {
  if (useServer) {
    const { mswServer } = require('./../mswServer');
    return mswServer.use(handler);
  }

  return handler;
};
