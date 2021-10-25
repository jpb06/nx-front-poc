// src/mocks/handlers.js
import { rest } from 'msw';

export const mockedRoles = [
  { id: 1, name: 'Developer' },
  { id: 2, name: 'Devops' },
  { id: 3, name: 'Squad Owner' },
  { id: 4, name: 'Chapter Owner' },
];

export const mockedSkills = [
  {
    id: 1,
    name: 'jest',
  },
  {
    id: 2,
    name: 'prisma',
  },
  {
    id: 3,
    name: 'nest',
  },
  {
    id: 4,
    name: 'react',
  },
  {
    id: 5,
    name: 'Typescript',
  },
];

export const handlers = [
  rest.get('*/roles', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedRoles));
  }),

  rest.get('*/skills', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedSkills));
  }),
];
