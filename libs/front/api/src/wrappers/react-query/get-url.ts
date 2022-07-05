import { Backend } from './types/backend.type';

export const getUrl = (backend: Backend, path: string) => {
  switch (backend) {
    case 'backend-app':
      return `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`;
  }
};
