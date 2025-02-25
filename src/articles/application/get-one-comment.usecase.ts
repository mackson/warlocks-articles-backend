import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { CommentEntity } from '../domain/comment.entity';

@Injectable()
export class GetOneCommentUseCase {
  constructor(
    @Inject('CommentRepository') private commentRepository: CommentRepository,
  ) { }

  async execute(id: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

}