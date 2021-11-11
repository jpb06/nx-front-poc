import { SignedUser } from '@api/dynamic-types/api-types';

export const mockedSignedUser: SignedUser = {
  id: '1',
  firstName: 'Yolo',
  lastName: 'Mc Cool',
  role: {
    id: 1,
    name: 'Skwat owner',
  },
  skills: ['nest', 'react'],
  token: 'token',
};
