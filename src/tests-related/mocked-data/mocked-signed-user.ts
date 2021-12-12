import { SignedUser } from '@api/swagger-types/api-types';

export const mockedSignedUser: SignedUser = {
  id: '1',
  firstName: 'Yolo',
  lastName: 'Mc Cool',
  role: {
    id: 1,
    name: 'Skwat owner',
  },
  skills: [
    { id: 1, name: 'nest' },
    { id: 2, name: 'react' },
  ],
  token: 'token',
};
