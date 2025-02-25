import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';
import { ArticleEntity } from '../domain/article.entity';

@Injectable()
export class GetOneArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) { }

  async execute(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

}