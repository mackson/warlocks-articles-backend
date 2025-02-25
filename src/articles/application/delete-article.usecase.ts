import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) {}

  async execute(articleId: string, userId: string): Promise<void> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author_id !== userId) {
      throw new UnauthorizedException('You do not have permission to delete this article');
    }

    await this.articleRepository.delete(articleId);
  }
}