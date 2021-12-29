import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { RoleDto } from '../../roles/roles/role.dto';
import { SkillDto } from '../../skills/dto/skill.dto';

@Exclude()
export class SignedUser {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  @Type(() => RoleDto)
  role: RoleDto;

  @Expose()
  @ApiProperty({ isArray: true, type: SkillDto })
  @Type(() => SkillDto)
  skills: Array<SkillDto>;

  @Expose()
  @ApiProperty()
  token: string;
}
