import { useQuery, UseQueryResult } from 'react-query';

import { delay } from '@logic/delay';

export const rolesTypes = ['Dev', 'Devops', 'SquadOwner', 'ChapterOwner'];
export type Role = typeof rolesTypes[number];

export type RoleItem = {
  key: Role;
  text: string;
};

const roles: Array<RoleItem> = [
  {
    key: 'Dev',
    text: 'Developer',
  },
  {
    key: 'Devops',
    text: 'Devops',
  },
  {
    key: 'SquadOwner',
    text: 'Squad Owner',
  },
  {
    key: 'ChapterOwner',
    text: 'Chapter Owner',
  },
];

export const useRolesQuery = (): UseQueryResult<RoleItem[], string> =>
  useQuery('roles', () => delay().then(() => roles));
