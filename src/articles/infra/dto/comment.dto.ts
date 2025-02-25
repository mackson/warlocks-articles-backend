import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import { XssSanitize } from 'src/shared/xss-cleaner.decorator';

export class CommentDto {

  @ApiProperty({
    example: '67bd29ed8e5a2c55f3c3f0fb',
    description: 'The id of the comment',
  })
  @IsString()
  id?: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a209bg',
    description: 'The ID of the Article',
  })
  @IsString()
  @IsNotEmpty()
  article_id: string;

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
  is_reply?: number;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'The ID of the comment being replied to, if applicable',
  })
  @IsString()
  @IsNotEmpty()
  reply_id: string;

  @ApiProperty({
    example: ['user1', 'user2'],
    description: 'The likes of the comment',
  })
  @IsArray()
  likes?: string[];

  @ApiProperty({
    example: 1,
    description: 'The status of the comment',
  })
  @IsNumber()
  status?: number;

  @ApiProperty({
    example: '2025-02-25T02:24:45.620Z',
    description: 'The create date of the comment',
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: '2025-02-25T02:24:45.620Z',
    description: 'The update date of the comment',
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}