import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { User } from './user.dto';

@Exclude()
export class UserProfileResultDto {
  @Expose()
  @ApiProperty({ type: User })
  @Type(() => User)
  result: User;
}
