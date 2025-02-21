import { Article } from "./article";

export interface ArticleRepository {
  findMany(): Promise<Article[]> | null;
  create(data: Article): Promise<Article> | null;
}