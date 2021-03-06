import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { RoleDto } from '../../roles/dto/role.dto';
import { SkillDto } from '../../skills/dto/skill.dto';

@Exclude()
export class User {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty({
    required: false,
  })
  userName?: string;

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
}
