import { ArticleEntity } from "./article.entity";

export interface ArticleRepository {
  create(account: ArticleEntity): Promise<String>;
  update(id: string, account: ArticleEntity): Promise<String>;
  delete(id: string, account: ArticleEntity): Promise<String>;
  findAll(): Promise<ArticleEntity[]>;
  findById(id: string): Promise<ArticleEntity | null>;
  updateLikes(id: string, like:string): Promise<String>;
}