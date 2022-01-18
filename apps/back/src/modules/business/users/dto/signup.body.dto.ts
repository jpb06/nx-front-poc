import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignupBodyDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  idRole: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(3)
  idSkills: Array<number>;
}
