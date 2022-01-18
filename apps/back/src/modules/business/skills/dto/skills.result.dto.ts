import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { SkillCategoryDto } from './skill.dto';

@Exclude()
export class SkillsResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: SkillCategoryDto })
  @Type(() => SkillCategoryDto)
  result: Array<SkillCategoryDto>;
}
