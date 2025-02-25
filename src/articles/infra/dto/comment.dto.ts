import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import { XssSanitize } from 'src/shared/xss-cleaner.decorator';

export class CommentDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The ID of the comment',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'The ID of the author',
  })
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @ApiProperty({
    example: 'This is the content of the comment',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  comment: string;

  @ApiProperty({
    example: 0,
    description: 'Indicates if the comment is a reply (0 for false, 1 for true)',
  })
  @IsNumber()
  @IsNotEmpty()
  is_reply: number;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'The ID of the comment being replied to, if applicable',
  })
  @IsString()
  @IsOptional()
  reply_id?: string;

  @ApiProperty({
    example: ['user1', 'user2'],
    description: 'The likes of the comment',
  })
  @IsArray()
  @IsOptional()
  likes?: string[];

  @ApiProperty({
    example: 1,
    description: 'The status of the comment',
  })
  @IsNumber()
  @IsOptional()
  status?: number;
}