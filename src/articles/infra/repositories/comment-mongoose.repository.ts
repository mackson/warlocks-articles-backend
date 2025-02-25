import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentRepository } from '../../domain/comment.repository';
import { CommentDocument } from '../schemas/comment.schema';
import { ArticleDocument } from '../schemas/article.schema';
import { CommentDto } from '../dto/comment.dto';
import { UnauthorizedException } from '@nestjs/common';

export class CommentMongooseRepository implements CommentRepository {
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDocument>,
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
  ) {}

  async create(articleId: string, comment: CommentEntity): Promise<string> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new UnauthorizedException('Article not found');
    }

    const newComment = new this.commentModel(comment);
    const savedComment = await newComment.save();

    if (!savedComment) {
      throw new UnauthorizedException('Article not created');
    }
    
    return 'Comment created with success';
  }

  async update(articleId: string, commentId: string, comment: Partial<CommentEntity>): Promise<string> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new UnauthorizedException('Article not found');
    }
    
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { ...comment },
      { new: true }
    ).exec();

    if (!updatedComment) {
      throw new UnauthorizedException('Comment not updated');
    }
  
    return 'Comment updated';
  }

  async delete(commentId: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(commentId).exec();
  }

  async findAll(articleId: string): Promise<CommentEntity[]> {
    const comments = await this.commentModel.find({article_id: articleId}).exec();
    return comments.map(comment => this.toEntity(comment));
  }

  async findById(id: string): Promise<CommentEntity | null> {
   
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) return null;

    const entity = this.toEntity(comment);

    return entity;
  }

  async updateLikes(articleId: string, commentId: string, userId: string): Promise<void> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new UnauthorizedException('Article not found');
    }

    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new UnauthorizedException('Comment not found');
    }

    const likeIndex = comment.likes.indexOf(userId);
    likeIndex === -1 ? comment.likes.push(userId) : comment.likes.splice(likeIndex, 1);

    const updatedArticle = await comment.save();
    if (!updatedArticle) {
      throw new UnauthorizedException('Article likes not updated');
    }
  }

  private toEntity(document: CommentDocument): CommentEntity {
    return {
      id: document._id?.toString() ?? '',
      article_id: document.article_id,
      author_id: document.author_id,
      comment: document.comment,
      is_reply: document.is_reply,
      reply_id: document.reply_id,
      likes: document.likes,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
