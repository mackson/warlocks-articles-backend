import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
import { CreateCommentUseCase } from 'src/articles/application/create-comment.usecase';
import { CommentDto } from '../dto/comment.dto';

@Controller('/articles/:articleId/comments')
@ApiTags('Comments')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(
    private createCommentUseCase: CreateCommentUseCase,
  ) {}

  @Post('create')
  async create(@Param('articleId') articleId: string, @Body() commentDto: CommentDto, @Request() req) {
    try {
      const comment = await this.createCommentUseCase.execute(articleId, commentDto, req.user.id);
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}