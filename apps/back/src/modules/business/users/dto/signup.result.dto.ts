import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { SignedUser } from './signed-user.dto';

@Exclude()
export class SignupResultDto {
  @Expose()
  @ApiProperty({ type: SignedUser })
  @Type(() => SignedUser)
  result: SignedUser;
}
