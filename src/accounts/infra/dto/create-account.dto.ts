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
import { Role } from 'src/accounts/application/roles/role.enum';

export class CreateAccountDto {
    @ApiProperty({
        example: 'Jane Doe',
        description: 'The name of the account',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'jane.doe@example.com',
        description: 'The email of the account',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'This is a bio',
        description: 'The bio of the account',
    })
    @IsString()
    @IsOptional()
    bio: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the account',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
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
    avatar: string;

}