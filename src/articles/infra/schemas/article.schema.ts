import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentEntity } from 'src/articles/domain/comment.entity';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: CommentEntity[];

  @Prop({ required: true })
  status: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);