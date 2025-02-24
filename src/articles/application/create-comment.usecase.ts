import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { CommentEntity } from '../domain/comment.entity';
import { ArticleRepository } from '../domain/article.repository';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    @Inject('CommentRepository') private commentRepository: CommentRepository,
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) {}

  async execute(articleId: string, data: Partial<CommentEntity>, userId: string): Promise<CommentEntity> {
    if (!data.comment) {
      throw new Error('Content is required');
    }

    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = new CommentEntity({
      ...data,
      author_id: userId,
    });

    return await this.commentRepository.create(articleId, comment);
  }
}