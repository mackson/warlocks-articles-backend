import { ArticleEntity } from "../article.entity";

export type ArticlesDto = {
  data: ArticleEntity[];
  total: number;
  page: number; 
  limit: number;
}

