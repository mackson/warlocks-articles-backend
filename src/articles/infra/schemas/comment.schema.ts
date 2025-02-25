import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {

  @Prop()
  id: string;

  @Prop({ required: true })
  article_id: string;

  @Prop({ required: true})
  author_id: string;

  @Prop({ required: true })
  comment: string;

  @Prop()
  is_reply: number;

  @Prop()
  reply_id: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ required: true })
  status: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);