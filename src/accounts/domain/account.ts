import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'src/shared/entity';

interface AccountProps {
  id: string;
  name: string;
  email: string;
  bio: string;
  password: string;
  group: string;
  status: number;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account extends Entity<AccountProps> {
  constructor(props: AccountProps) {
    super(props);
  }

  @ApiProperty({ 
    example: 'dwv7SB9Fyc8KskMjnzT6JRQYCUPHDXam32G', 
    description: 'The id of the account' 
  })
  get id(): string {
    return this.props.id;
  }

  @ApiProperty({ 
    example: 'Jane Doe', 
    description: 'The name of the account' 
  })
  get name(): string {
    return this.props.name;
  }

  @ApiProperty({ 
    example: 'jane.doe@example.com', 
    description: 'The email of the account' 
  })
  get email(): string {
    return this.props.email;
  }

  @ApiProperty({ 
    example: 'This is a bio', 
    description: 'The bio of the account' 
  })
  get bio(): string {
    return this.props.bio;
  }

  @ApiProperty({ 
    example: 'password123', 
    description: 'The password of the account' 
  })
  get password(): string {
    return this.props.password;
  }

  @ApiProperty({ 
    example: 'admin', 
    description: 'The group of the account' 
  })
  get group(): string {
    return this.props.group;
  }

  @ApiProperty({ 
    example: 1, 
    description: 'The status of the account' 
  })
  get status(): number {
    return this.props.status;
  }

  @ApiProperty({ 
    example: 'https://example.com/avatar.jpg', 
    description: 'The avatar URL of the account' 
  })
  get avatar(): string {
    return this.props.avatar;
  }

  @ApiProperty({ 
    example: '2025-02-20T00:00:00.000Z', 
    description: 'The creation date of the account' 
  })
  get createdAt(): Date {
    return this.props.createdAt;
  }

  @ApiProperty({ 
    example: '2025-02-20T00:00:00.000Z', 
    description: 'The last update date of the account' 
  })
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}