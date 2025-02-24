import { CommentEntity } from "./comment.entity";

interface ArticleProps {
  title: string;
  slug: string;
  author_id: string;
  content: string;
  cover: string;
  likes: string[];
  tags: string[];
  comments: CommentEntity[];
  status: number;
}

export class ArticleEntity {
 
  title: string;

  slug: string;

  author_id: string;

  content: string;

  cover: string;

  likes: string[];

  tags: string[];

  comments: CommentEntity[];

  status: number;

  constructor(props: ArticleProps){
    Object.assign(this, props);
  }
}