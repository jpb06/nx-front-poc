import {
  GetAllSkillsError,
  GetAllSkillsSuccess,
  path,
} from '@front/api/skills/get-all';

import { useAxiosQuery } from '../generic/useAxiosQuery';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllSkillsError>('skills', path, 'GET');
