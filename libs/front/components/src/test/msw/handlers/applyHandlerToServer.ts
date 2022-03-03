import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';

export const applyHandlerToServer = (
  handler: RestHandler<MockedRequest<DefaultRequestBody>>,
  useServer: boolean
) => {
  if (useServer) {
    const { server } = require('./../server');
    return server.use(handler);
  }

  return handler;
};
