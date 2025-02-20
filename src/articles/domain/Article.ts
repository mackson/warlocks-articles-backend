import { ApiProperty } from '@nestjs/swagger';

export class Article {
 
  @ApiProperty({ 
    example: 'Creating Bots for Discord', 
    description: 'The title of the article' 
  })
  title: string;

}