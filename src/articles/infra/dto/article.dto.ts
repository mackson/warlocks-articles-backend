import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import { XssSanitize } from 'src/shared/xss-cleaner.decorator';

export class ArticleDto {

  @ApiProperty({
    example: '67bd29ed8e5a2c55f3c3f0fb',
    description: 'The id of the article',
  })
  @IsString()
  id?: string;
  @ApiProperty({
    example: 'My First Article',
    description: 'The title of the article',
  })
  @IsString()
  @IsNotEmpty()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  title: string;

  @ApiProperty({
    example: 'This is the content of the article',
    description: 'The content of the article',
  })
  @IsString()
  @IsNotEmpty()
  @XssSanitize()
  @Transform(({ value }) => sanitize(value))
  content: string;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'The cover image URL of the article',
  })
  @IsString()
  @IsOptional()
  cover?: string;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'The tags of the article',
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: 1,
    description: 'The status of the article',
  })
  @IsNumber()
  @IsOptional()
  status?: number;

  @ApiProperty({
    example: '2025-02-25T02:24:45.620Z',
    description: 'The create date of the article',
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: '2025-02-25T02:24:45.620Z',
    description: 'The update date of the article',
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}