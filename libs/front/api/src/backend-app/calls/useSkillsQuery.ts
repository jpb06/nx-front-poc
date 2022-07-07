import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import {
  GetAllSkillsError,
  GetAllSkillsSuccess,
  path,
} from './../specs/SkillsController/getAllSkills';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllSkillsError>({
    key: ['skills'],
    backend: 'backend-app',
    path,
    method: 'GET',
  });
