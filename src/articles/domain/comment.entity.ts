interface CommentProps {
  id: string;
  author_id: string;
  comment: string;
  is_reply: number;
  reply_id: string;
  likes: string[];
  status: number;
}

export class CommentEntity {

  id: string;
 
  author_id: string;

  comment: string;

  is_reply: number;

  reply_id: string;

  likes: string[];

  status: number;

  constructor(props: CommentProps){
    Object.assign(this, props);
  }
}