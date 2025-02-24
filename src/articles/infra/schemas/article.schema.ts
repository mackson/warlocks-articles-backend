import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio: string;


  @Prop()
  avatar: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  status: number;
}

// Gera o Schema automaticamente
export const AccountSchema = SchemaFactory.createForClass(Article);