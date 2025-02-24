import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class ArticleDto {
  @ApiProperty({
    example: 'My First Article',
    description: 'The title of the article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is the content of the article',
    description: 'The content of the article',
  })
  @IsString()
  @IsNotEmpty()
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
}