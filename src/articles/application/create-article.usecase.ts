import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepository } from '../domain/article.repository';
import { ArticleEntity } from '../domain/article.entity';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) {}

  async execute(data: Partial<ArticleEntity>, userId: string): Promise<String> {

    if (!data.title || !data.content) {
      throw new Error('Title and content are required');
    }
    
    const slug = `${data.title.replace(/\s+/g, '-').toLowerCase()}-${userId}`;
    
    const article = new ArticleEntity({
      title: data.title || 'Untitled',
      content: data.content || '',
      cover: data.cover || '',
      slug,
      author_id: userId,
      likes: [],
      tags: data.tags || [],
      comments: [],
      status: data.status || 1,
    });

    const savedArticle = await this.articleRepository.create(article);

    if (!savedArticle) {
      throw new Error('Article not created');
    }
  
    return 'Article created';
  }
}