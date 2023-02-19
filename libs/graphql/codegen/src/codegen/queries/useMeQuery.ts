import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useFetchData } from './../../useFetchData';
import { namedQuerySelectorToDocument } from '../logic/named-query-selector-to-document';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';

type MeSelectorResult = Pick<QuerySelectorResult, 'me'>['me'];

export type MeResult<Selector> = {
  me: DeepReplace<Selector, MeSelectorResult>;
};

export const useMePartialQuery = <
  Selector extends Pick<QuerySelector, 'me'>['me']
>(
  selector: Selector,
  options?: Omit<
    UseQueryOptions<MeResult<Selector>, unknown, MeResult<Selector>>,
    'queryFn' | 'queryKey'
  >
): UseQueryResult<MeResult<Selector>> => {
  const document = namedQuerySelectorToDocument('me', selector);

  return useQuery<MeResult<Selector>, unknown, MeResult<Selector>>({
    queryKey: ['me'],
    queryFn: useFetchData<MeResult<Selector>>(document),
    ...options,
  });
};

type MeSelector = {
  id: boolean;
  email: boolean;
  lastName: boolean;
  firstName: boolean;
  joinDate: boolean;
  role: boolean;
  token: boolean;
};

export const useMeQuery = (
  options?: Omit<
    UseQueryOptions<MeResult<MeSelector>, unknown, MeResult<MeSelector>>,
    'queryFn' | 'queryKey'
  >
): UseQueryResult<MeResult<MeSelector>> =>
  useMePartialQuery(
    {
      id: true,
      email: true,
      lastName: true,
      firstName: true,
      joinDate: true,
      role: true,
      token: true,
    },
    options
  );
