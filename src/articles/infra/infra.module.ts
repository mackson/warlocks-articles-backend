import { Module } from '@nestjs/common';
import { ArticleMongooseRepository } from 'src/articles/infra/repositories/article-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { ArticleController } from './http/article.controller';
import { CommentController } from './http/comment.controller';
import { CreateArticleUseCase } from '../application/create-article.usecase';
import { CreateCommentUseCase } from '../application/create-comment.usecase';
import { DeleteArticleUseCase } from '../application/delete-article.usecase';
import { DeleteCommentUseCase } from '../application/delete-comment.usecase';
import { GetAllArticlesUseCase } from '../application/get-all-articles.usecase';
import { GetAllCommentsUseCase } from '../application/get-all-comments.usecase';
import { GetOneArticleUseCase } from '../application/get-one-article.usecase';
import { GetOneCommentUseCase } from '../application/get-one-comment.usecase';
import { SearchArticlesUseCase } from '../application/search-articles.usecase';
import { UpdateArticleUseCase } from '../application/update-article.usecase';
import { UpdateCommentUseCase } from '../application/update-comment.usecase';
import { CommentMongooseRepository } from './repositories/comment-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
  ],
  controllers: [ArticleController, CommentController],
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
    GetOneCommentUseCase,
    SearchArticlesUseCase,
    UpdateArticleUseCase,
    UpdateCommentUseCase,
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
    GetOneCommentUseCase,
    SearchArticlesUseCase,
    UpdateArticleUseCase,
    UpdateCommentUseCase,
  ],
})export class InfraModule {}
