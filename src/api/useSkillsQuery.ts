import { useQuery } from 'react-query';

import { CheckboxItem } from '@components/generic/forms/checkboxes/CheckBoxGroup';
import { delay } from '@logic/delay';

const skills: Array<CheckboxItem> = [
  {
    id: 1,
    label: 'jest',
  },
  {
    id: 2,
    label: 'prisma',
  },
  {
    id: 3,
    label: 'nest',
  },
  {
    id: 4,
    label: 'react',
  },
  {
    id: 5,
    label: 'Typescript',
  },
];

export const useSkillsQuery = () =>
  useQuery('skills', () => delay().then(() => skills));
