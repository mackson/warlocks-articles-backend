import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { CommentEntity } from '../domain/comment.entity';
import { ArticleRepository } from '../domain/article.repository';

@Injectable()
export class UpdateCommentUseCase {
  constructor(
    @Inject('CommentRepository') private commentRepository: CommentRepository,
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) { }

  async execute(articleId: string, commentId: string, comment: Partial<CommentEntity>, userId: string): Promise<String> {
   
    if (comment.author_id !== userId) {
      throw new UnauthorizedException('You do not have permission to edit this comment');
    }

    const updatedComment = await this.commentRepository.update(articleId, commentId, comment);
    if (!updatedComment) {
      throw new UnauthorizedException('Comment not updated');
    }

    return updatedComment;
  }

  async updateLikes(articleId: string, commentId: string, userId: string): Promise<void> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

     const comment = await this.commentRepository.findById(commentId);
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

    await this.commentRepository.updateLikes(articleId, commentId, userId);
  }
}