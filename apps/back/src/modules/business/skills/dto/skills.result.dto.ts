import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { SkillDto } from './skill.dto';

@Exclude()
export class SkillsResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: SkillDto })
  @Type(() => SkillDto)
  result: Array<SkillDto>;
}
