import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { RoleDto } from './role.dto';

@Exclude()
export class RolesResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: RoleDto })
  @Type(() => RoleDto)
  result: Array<RoleDto>;
}
