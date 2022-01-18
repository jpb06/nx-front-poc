import { Role } from './role.interface';
import { SkillCategory } from './skill.interface';
import { User } from './user.interface';

export default interface Database {
  roles: Array<Role>;
  skills: Array<SkillCategory>;
  users: Array<User>;
}
