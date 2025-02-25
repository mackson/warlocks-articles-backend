import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';
import { ArticleEntity } from '../domain/article.entity';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) { }

  async execute(articleId: string, data: Partial<ArticleEntity>, userId: string): Promise<String> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author_id !== userId) {
      throw new UnauthorizedException('You do not have permission to edit this article');
    }

    const updatedArticle = await this.articleRepository.update(articleId, data);
    if (!updatedArticle) {
      throw new Error('Article not updated');
    }

    return updatedArticle;
  }

  async updateLikes(articleId: string, userId: string): Promise<void> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    await this.articleRepository.updateLikes(articleId, userId);
  }
}