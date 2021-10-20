import { Role } from '@api/useRolesQuery';

export interface FormModel {
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  skills: Array<number>;
}
