import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentRepository } from '../../domain/comment.repository';
import { ArticleDocument } from '../schemas/article.schema';

export class CommentMongooseRepository implements CommentRepository {
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDocument>,
  ) {}

  async create(articleId: string, comment: CommentEntity): Promise<string> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.comments.push(comment);
    
    const savedComment = await article.save();
    if (!savedComment) {
      throw new Error('Comment not created');
    }
    return 'Comment created';
  }

  async update(articleId: string, commentId: string, comment: Partial<CommentEntity>): Promise<string> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const commentIndex = article.comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    article.comments[commentIndex] = { 
      ...article.comments[commentIndex], 
      ...comment 
    };
    await article.save();
    return 'Comment updated';
  }

  async delete(articleId: string, commentId: string): Promise<void> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    article.comments = article.comments.filter(c => c.id !== commentId);
    await article.save();
  }

  async findAll(articleId: string,): Promise<CommentEntity[]> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    return article.comments;
  }

  async updateLikes(articleId: string, commentId: string, userId: string): Promise<void> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    const comment = article.comments.find(cmnt => cmnt.id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    const likeIndex = comment.likes.indexOf(userId);
    likeIndex === -1 ? comment.likes.push(userId) : comment.likes.splice(likeIndex, 1);

    const updatedComment = await article.save();
    if (!updatedComment) {
      throw new Error('Article likes not updated');
    }
  }
}
