import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';
import { ArticleEntity } from '../domain/article.entity';

@Injectable()
export class SearchArticlesUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) { }

  async execute(title: string): Promise<ArticleEntity[]> {
    return await this.articleRepository.search(title);
  }
}