import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import { Role } from 'src/accounts/application/roles/role.enum';
import { XssSanitize } from 'src/shared/xss-cleaner.decorator';

export class AccountDto {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'The name of the account',
  })
  @IsString()
  @IsNotEmpty()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  name: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'The email of the account',
  })
  @IsEmail()
  @IsNotEmpty()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  email: string;

  @ApiProperty({
    example: 'This is a bio',
    description: 'The bio of the account',
  })
  @IsString()
  @IsOptional()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  bio: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the account',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  password: string;

  @ApiProperty({
    example: [Role.Author],
    description: 'The roles of the account',
  })
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles: Role[];

  @ApiProperty({
    example: 1,
    description: 'The status of the account',
  })
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar URL of the account',
  })
  @IsUrl()
  @IsOptional()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  avatar: string;
}