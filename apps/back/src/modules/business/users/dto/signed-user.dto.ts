import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { User } from './user.dto';

@Exclude()
export class SignedUser extends User {
  @Expose()
  @ApiProperty()
  token: string;
}
