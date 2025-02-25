import { CommentEntity } from "./comment.entity";

export interface CommentRepository {
  create(articleId: string, comment: CommentEntity): Promise<String>;
  update(articleId: string, commentId: string, comment: Partial<CommentEntity>): Promise<string>;
  delete(articleId: string, commentId: string): Promise<void>;
  findAll(articleId: string): Promise<CommentEntity[]>;
  updateLikes(articleId: string, id: string, like:string): Promise<void>;
}