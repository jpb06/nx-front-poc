import { User } from '@api/types';

export const mockedUser: User = {
  id: '1',
  firstName: 'Yolo',
  lastName: 'Mc Cool',
  userName: 'Owowo Mcfly',
  role: {
    id: 1,
    name: 'Skwat owner',
  },
  skills: [
    { id: 6, name: 'Communication' },
    { id: 8, name: 'Information sharing' },
    {
      id: 7,
      name: 'Project drive',
    },
    { id: 9, name: 'Reporting' },
    { id: 11, name: 'Roadmap definition' },
    { id: 1, name: 'jest' },
    { id: 4, name: 'react' },
    { id: 5, name: 'Typescript' },
    { id: 10, name: 'Github actions' },
  ],
};
