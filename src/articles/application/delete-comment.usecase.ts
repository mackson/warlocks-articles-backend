import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { ArticleRepository } from '../domain/article.repository';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    @Inject('CommentRepository') private commentRepository: CommentRepository,
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) {}

  async execute(commentId: string, userId: string): Promise<void> {
    
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author_id !== userId) {
      throw new UnauthorizedException('You do not have permission to delete this comment');
    }

    await this.commentRepository.delete(commentId);
  }
}