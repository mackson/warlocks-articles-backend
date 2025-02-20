import { Article } from "./Article";

export abstract class ArticleRepository {
  abstract findMany(): Promise<Article[]> | null;
  abstract create(data: Article): Promise<Article> | null;
}