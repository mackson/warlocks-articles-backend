import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  UseGuards,
  Request,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
import { CreateCommentUseCase } from 'src/articles/application/create-comment.usecase';
import { UpdateCommentUseCase } from 'src/articles/application/update-comment.usecase';
import { DeleteCommentUseCase } from 'src/articles/application/delete-comment.usecase';
import { GetAllCommentsUseCase } from 'src/articles/application/get-all-comments.usecase';
import { CommentDto } from '../dto/comment.dto';

@Controller('/articles/:articleId/comments')
@ApiTags('Comments')
export class CommentController {
  constructor(
    private createCommentUseCase: CreateCommentUseCase,
    private updateCommentUseCase: UpdateCommentUseCase,
    private deleteCommentUseCase: DeleteCommentUseCase,
    private getAllCommentsUseCase: GetAllCommentsUseCase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(
    @Param('articleId') articleId: string, 
    @Body() commentDto: CommentDto, 
    @Request() req: any
  ) {
    try {
      const comment = await this.createCommentUseCase.execute(articleId, commentDto, req.account.sub);
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  @Put('/update/:commentId')
  async update(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Body() commentDto: CommentDto,
    @Request() req: any
  ) {
    try {
      const comment = await this.updateCommentUseCase.execute(articleId, commentId, commentDto, req.account.sub);
      return comment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }

  @Delete('/delete/:commentId')
  async delete(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Request() req: any
  ) {
    try {
      await this.deleteCommentUseCase.execute(articleId, commentId, req.account.sub);
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }

  @Get('all')
  async getAll(@Param('articleId') articleId: string) {
    try {
      const comments = await this.getAllCommentsUseCase.execute(articleId);
      return comments;
    } catch (error) {
      throw new NotFoundException('Comments not found');
    }
  }

  @Get('/updatelike/:articleId/:commentId')
  @UseGuards(AuthGuard)
  async updateLikes(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Request() req: any
  ) {
    try {
      await this.updateCommentUseCase.updateLikes(articleId, commentId, req.account.sub);
      return { message: 'Comment likes updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}