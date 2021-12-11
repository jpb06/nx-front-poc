import { ParsedUrlQuery } from 'querystring';

import { mocked } from 'jest-mock';
import { mockDeep } from 'jest-mock-extended';
import { MittEmitter } from 'next/dist/shared/lib/mitt';
import { NextRouter, useRouter } from 'next/router';

interface MockedNextRouter {
  pushMock: jest.Mock<unknown, unknown[]>;
  replaceMock: jest.Mock<unknown, unknown[]>;
  backMock: jest.Mock<unknown, unknown[]>;
}

interface MockNextRouterProps {
  slug?: unknown;
  pathname?: string;
  query?: ParsedUrlQuery;
  basePath?: string;
  route?: string;
}

export const mockNextRouter = (
  props?: MockNextRouterProps
): MockedNextRouter => {
  const pushMock = jest.fn();
  const replaceMock = jest.fn();
  const backMock = jest.fn();

  mocked(useRouter).mockReturnValue({
    push: pushMock,
    replace: replaceMock,
    back: backMock,
    query: props?.query ? props?.query : { slug: props?.slug },
    pathname: props?.pathname,
    events: mockDeep<MittEmitter<unknown>>(),
    basePath: props?.basePath,
    route: props?.route,
  } as unknown as NextRouter);

  return { pushMock, replaceMock, backMock };
};
