import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';
import { ArticlesDto } from '../domain/dto/articles.dto';

@Injectable()
export class GetAllArticlesUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) { }

  async execute(page: number, limit: number): Promise<ArticlesDto> {
    return await this.articleRepository.findAll(page, limit);
  }
}