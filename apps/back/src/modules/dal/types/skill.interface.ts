export interface SkillCategory {
  id: number;
  name: string;
  skills: Array<Skill>;
}

export interface Skill {
  id: number;
  name: string;
  idRoles: Array<number>;
}
