import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import {
  GetAllSkillsError,
  GetAllSkillsSuccess,
  path,
} from './../specs/SkillsController/getAllSkills';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllSkillsError>({
    key: ['skills'],
    url: path,
    method: 'GET',
  });
