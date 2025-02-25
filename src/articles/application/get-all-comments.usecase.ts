import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { CommentEntity } from '../domain/comment.entity';

@Injectable()
export class GetAllCommentsUseCase {
  constructor(
    @Inject('CommentRepository') private commentRepository: CommentRepository,
  ) { }

  async execute(articleId: string): Promise<CommentEntity[]> {
    return await this.commentRepository.findAll(articleId);
  }
}