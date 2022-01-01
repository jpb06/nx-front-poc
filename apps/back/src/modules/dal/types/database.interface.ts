import { Role } from './role.interface';
import { Skill } from './skill.interface';
import { User } from './user.interface';

export default interface Database {
  roles: Array<Role>;
  skills: Array<Skill>;
  users: Array<User>;
}
