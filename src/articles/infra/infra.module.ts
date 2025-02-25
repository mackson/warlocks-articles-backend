import { Module } from '@nestjs/common';
import { ArticleMongooseRepository } from 'src/articles/infra/repositories/article-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { ArticleController } from './http/article.controller';
import { CreateArticleUseCase } from '../application/create-article.usecase';
import { CreateCommentUseCase } from '../application/create-comment.usecase';
import { DeleteArticleUseCase } from '../application/delete-article.usecase';
import { DeleteCommentUseCase } from '../application/delete-comment.usecase';
import { GetAllArticlesUseCase } from '../application/get-all-articles.usecase';
import { GetAllCommentsUseCase } from '../application/get-all-comments.usecase';
import { GetOneArticleUseCase } from '../application/get-one-article.usecase';
import { SearchArticlesUseCase } from '../application/search-articles.usecase';
import { UpdateArticleUseCase } from '../application/update-article.usecase';
import { UpdateCommentUseCase } from '../application/update-comment.usecase';
import { CommentMongooseRepository } from './repositories/comment-mongoose.repository';
import { CacheInvalidationHelper } from 'src/shared/cache.invalidation.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [
    {
      provide: 'ArticleRepository',
      useClass: ArticleMongooseRepository,
    },
    {
      provide: 'CommentRepository',
      useClass: CommentMongooseRepository,
    },
    CreateArticleUseCase,
    CreateCommentUseCase,
    DeleteArticleUseCase,
    DeleteCommentUseCase,
    GetAllArticlesUseCase,
    GetAllCommentsUseCase,
    GetOneArticleUseCase,
    SearchArticlesUseCase,
    UpdateArticleUseCase,
    UpdateCommentUseCase,
    CacheInvalidationHelper,
   
  ],
  exports: [
    'ArticleRepository',
    'CommentRepository',
    CreateArticleUseCase,
    CreateCommentUseCase,
    DeleteArticleUseCase,
    DeleteCommentUseCase,
    GetAllArticlesUseCase,
    GetAllCommentsUseCase,
    GetOneArticleUseCase,
    SearchArticlesUseCase,
    UpdateArticleUseCase,
    UpdateCommentUseCase,
    CacheInvalidationHelper
  ],
  
})
export class InfraModule {}
