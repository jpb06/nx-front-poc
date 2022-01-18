import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SkillsAvailabilityForRoleBodyDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  idRole: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  idSkills: Array<number>;
}
