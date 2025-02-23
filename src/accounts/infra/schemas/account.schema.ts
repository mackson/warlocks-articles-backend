import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/accounts/application/roles/role.enum';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio: string;

  @Prop({ type: [String], enum: Object.values(Role), required: true })
  roles: Role[];

  @Prop()
  avatar: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  status: number;
}

// Gera o Schema automaticamente
export const AccountSchema = SchemaFactory.createForClass(Account);
