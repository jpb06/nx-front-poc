import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import {
  GetAllSkillsError,
  GetAllSkillsSuccess,
  path,
} from './../specs/SkillsController/getAllSkills';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllSkillsError>('skills', path, 'GET');
