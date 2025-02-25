import { CommentEntity } from "./comment.entity";

export interface CommentRepository {
  create(articleId: string, comment: CommentEntity): Promise<String>;
  update(articleId: string, commentId: string, comment: Partial<CommentEntity>): Promise<string>;
  delete(commentId: string): Promise<void>;
  findAll(articleId: string): Promise<CommentEntity[]>;
  findById(id: string): Promise<CommentEntity | null>;
  updateLikes(articleId: string, id: string, like:string): Promise<void>;
}