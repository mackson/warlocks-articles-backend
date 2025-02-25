import { ArticleEntity } from "./article.entity";
import { ArticlesDto } from "./dto/articles.dto";

export interface ArticleRepository {
  create(article: ArticleEntity): Promise<String>;
  update(id: string, article: Partial<ArticleEntity>): Promise<String>;
  delete(id: string): Promise<void>;
  findAll(page: number, limit: number): Promise<ArticlesDto>;
  search(title: string): Promise<ArticleEntity[]>;
  findBySlug(slug: string): Promise<ArticleEntity | null>;
  findById(id: string): Promise<ArticleEntity | null>;
  updateLikes(id: string, like:string): Promise<void>;
}