import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {

  @Prop()
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  author_id: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  cover: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  status: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);