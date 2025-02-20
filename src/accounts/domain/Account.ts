import { ApiProperty } from '@nestjs/swagger';

export class Account {
 
  @ApiProperty({ 
    example: 'Jane Doe', 
    description: 'The name of the account' 
  })
  name: string;

}