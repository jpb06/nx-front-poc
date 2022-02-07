import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class SkillsAvailabilityForRoleResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: Number })
  @Type(() => Number)
  result: Array<number>;
}
