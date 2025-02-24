import { CommentEntity } from "./comment.entity";

export interface CommentRepository {
  create(account: CommentEntity): Promise<String>;
  update(id: string, account: CommentEntity): Promise<String>;
  delete(id: string, account: CommentEntity): Promise<String>;
  findAll(): Promise<CommentEntity[]>;
  updateLikes(id: string, like:string): Promise<String>;
}