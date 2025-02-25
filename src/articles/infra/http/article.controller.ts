import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Put,
    Param,
    NotFoundException,
    UnauthorizedException,
    Delete,
    Get,
    Query,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
import { CreateArticleUseCase } from 'src/articles/application/create-article.usecase';
import { ArticleDto } from '../dto/article.dto';
import { UpdateArticleUseCase } from 'src/articles/application/update-article.usecase';
import { DeleteArticleUseCase } from 'src/articles/application/delete-article.usecase';
import { GetAllArticlesUseCase } from 'src/articles/application/get-all-articles.usecase';
import { GetOneArticleUseCase } from 'src/articles/application/get-one-article.usecase';
import { SearchArticlesUseCase } from 'src/articles/application/search-articles.usecase';
  
@Controller('/articles')
@ApiTags('Articles')
export class ArticleController {
  constructor(
    private createArticleUseCase: CreateArticleUseCase,
    private updateArticleUseCase: UpdateArticleUseCase,
    private deleteArticleUseCase: DeleteArticleUseCase,
    private getAllArticlesUseCase: GetAllArticlesUseCase,
    private getOneArticleUseCase: GetOneArticleUseCase,
    private searchArticlesUseCase: SearchArticlesUseCase
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(
    @Body() articleDto: Partial<ArticleDto>, 
    @Request() req: any
  ) {
    try {
      const article = await this.createArticleUseCase.execute(articleDto, req.account.sub);
      return article;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') articleId: string,
    @Body() articleDto: ArticleDto, 
    @Request() req: any
  ) {
    try {
      const article = await this.updateArticleUseCase.execute(articleId, articleDto, req.account.sub);
      return article;
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

  @Get('/updatelike/:articleId')
  @UseGuards(AuthGuard)
  async updateLikes(
    @Param('articleId') articleId: string,
    @Request() req: any
  ) {
    try {
      await this.updateArticleUseCase.updateLikes(articleId, req.account.sub);
      return { message: 'Article likes updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('/delete/:articleId')
  @UseGuards(AuthGuard)
  async delete(
    @Param('articleId') articleId: string, 
    @Request() req: any
  ) {
    try {
      await this.deleteArticleUseCase.execute(articleId, req.account.sub);
      return { message: 'Article deleted successfully' };
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
  async getAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    try {
      const articles = await this.getAllArticlesUseCase.execute(page, limit);
      return articles;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':slug')
  async showArticle(@Param('slug') slug: string) {
    try {
      const article = await this.getOneArticleUseCase.execute(slug);
      return article;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('search')
  async search(@Body() body: { title: string }) {
    try {
      const articles = await this.searchArticlesUseCase.execute(body.title);
      return articles;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}