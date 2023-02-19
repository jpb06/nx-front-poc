import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';

import { useFetchData } from './../../useFetchData';
import { dynamicQuerySelectorToDocument } from '../logic/dynamic-query-selector-to-document';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';

type GqlQueryResultType<Selector> = DeepReplace<Selector, QuerySelectorResult>;

export const useGqlQuery = <Selector extends QuerySelector>(
  key: QueryKey,
  selector: Selector,
  variables?: unknown
): UseQueryResult<GqlQueryResultType<Selector>> => {
  const document = dynamicQuerySelectorToDocument(selector, variables);

  return useQuery<
    GqlQueryResultType<Selector>,
    unknown,
    GqlQueryResultType<Selector>
  >({
    queryKey: key,
    queryFn: useFetchData<GqlQueryResultType<Selector>>(document).bind(
      null,
      variables,
      undefined
    ),
  });
};
