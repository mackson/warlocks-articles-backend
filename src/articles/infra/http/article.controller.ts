import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
  import { CreateArticleUseCase } from 'src/articles/application/create-article.usecase';
  import { ArticleDto } from '../dto/article.dto';
  
  @Controller('/articles')
  @ApiTags('Articles')
  @UseGuards(AuthGuard)
  export class ArticleController {
    constructor(
      private createArticleUseCase: CreateArticleUseCase,
    ) {}
  
    @Post('create')
    async create(@Body() articleDto: ArticleDto, @Request() req) {
      try {
        const article = await this.createArticleUseCase.execute(articleDto, req.user.id);
        return article;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }