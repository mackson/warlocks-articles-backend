interface CommentProps {
  id?: string;
  article_id: string;
  author_id: string;
  comment: string;
  is_reply: number;
  reply_id: string;
  likes: string[];
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CommentEntity {
  id?: string;

  article_id: string;
 
  author_id: string;

  comment: string;

  is_reply: number;

  reply_id: string;

  likes: string[];

  status: number;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props: CommentProps){
    Object.assign(this, props);
  }
}