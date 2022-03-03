import { applyHandlerToServer } from './msw/handlers/applyHandlerToServer';
import { genericGetHandler } from './msw/handlers/generic-get.handler';
import { genericPostHandler } from './msw/handlers/generic-post.handler';
import { server } from './msw/server';

export * from './renders/render';
export * from './wrappers/react-hook-form';
export * from './wrappers/react-query';

export const mswHandlers = {
  applyHandlerToServer,
  genericGetHandler,
  genericPostHandler,
};

export const mswServer = server;
