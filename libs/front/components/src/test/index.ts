import { applyHandlerToServer } from './msw/handlers/applyHandlerToServer';
import { genericGetHandler } from './msw/handlers/generic-get.handler';
import { genericPostHandler } from './msw/handlers/generic-post.handler';

export const mswHandlers = {
  applyHandlerToServer,
  genericGetHandler,
  genericPostHandler,
};
