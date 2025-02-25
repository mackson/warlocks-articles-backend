import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { ArticleController } from '../src/articles/infra/http/article.controller';
import { AuthGuard } from '../src/accounts/application/guards/auth.guard';
import { CreateArticleUseCase } from '../src/articles/application/create-article.usecase';
import { UpdateArticleUseCase } from '../src/articles/application/update-article.usecase';
import { DeleteArticleUseCase } from '../src/articles/application/delete-article.usecase';
import { GetAllArticlesUseCase } from '../src/articles/application/get-all-articles.usecase';
import { GetOneArticleUseCase } from '../src/articles/application/get-one-article.usecase';
import { SearchArticlesUseCase } from '../src/articles/application/search-articles.usecase';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;
  const createArticleUseCase = { execute: jest.fn() };
  const updateArticleUseCase = { execute: jest.fn(), updateLikes: jest.fn() };
  const deleteArticleUseCase = { execute: jest.fn() };
  const getAllArticlesUseCase = { execute: jest.fn() };
  const getOneArticleUseCase = { execute: jest.fn() };
  const searchArticlesUseCase = { execute: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        { provide: CreateArticleUseCase, useValue: createArticleUseCase },
        { provide: UpdateArticleUseCase, useValue: updateArticleUseCase },
        { provide: DeleteArticleUseCase, useValue: deleteArticleUseCase },
        { provide: GetAllArticlesUseCase, useValue: getAllArticlesUseCase },
        { provide: GetOneArticleUseCase, useValue: getOneArticleUseCase },
        { provide: SearchArticlesUseCase, useValue: searchArticlesUseCase },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.account = { sub: 'fake-user-id' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /articles/create', () => {
    it('should create an article', async () => {
      const mockArticle = { id: '1', title: 'Article Test', content: 'Content of article' };
      createArticleUseCase.execute.mockResolvedValue(mockArticle);
      const response = await request(app.getHttpServer())
        .post('/articles/create')
        .send({ title: 'Article Test', content: 'Content of article' })
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(mockArticle);
      expect(createArticleUseCase.execute).toHaveBeenCalledWith(
        { title: 'Article Test', content: 'Content of article' },
        'fake-user-id'
      );
    });
  });

  describe('PUT /articles/update/:id', () => {
    it('should update an article', async () => {
      const updatedArticle = { id: '1', title: 'Updated Article', content: 'Updated content' };
      updateArticleUseCase.execute.mockResolvedValue(updatedArticle);
      const response = await request(app.getHttpServer())
        .put('/articles/update/1')
        .send({ title: 'Updated Article', content: 'Updated content' })
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(updatedArticle);
      expect(updateArticleUseCase.execute).toHaveBeenCalledWith(
        '1',
        { title: 'Updated Article', content: 'Updated content' },
        'fake-user-id'
      );
    });
  });

  describe('GET /articles/updatelike/:articleId', () => {
    it('should update article likes', async () => {
      updateArticleUseCase.updateLikes.mockResolvedValue(undefined);
      const response = await request(app.getHttpServer())
        .get('/articles/updatelike/1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({ message: 'Article likes updated successfully' });
      expect(updateArticleUseCase.updateLikes).toHaveBeenCalledWith('1', 'fake-user-id');
    });
  });

  describe('DELETE /articles/delete/:articleId', () => {
    it('should delete an article', async () => {
      deleteArticleUseCase.execute.mockResolvedValue(undefined);
      const response = await request(app.getHttpServer())
        .delete('/articles/delete/1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({ message: 'Article deleted successfully' });
      expect(deleteArticleUseCase.execute).toHaveBeenCalledWith('1', 'fake-user-id');
    });
  });

  describe('GET /articles/all', () => {
    it('should return all articles with pagination', async () => {
      const articles = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      getAllArticlesUseCase.execute.mockResolvedValue(articles);
      const response = await request(app.getHttpServer())
        .get('/articles/all?page=1&limit=10')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(articles);
      expect(getAllArticlesUseCase.execute).toHaveBeenCalledWith("1", "10");
    });
  });

  describe('GET /articles/:slug', () => {
    it('should return a single article by slug', async () => {
      const article = { id: '1', title: 'Single Article', slug: 'single-article' };
      getOneArticleUseCase.execute.mockResolvedValue(article);
      const response = await request(app.getHttpServer())
        .get('/articles/single-article')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(article);
      expect(getOneArticleUseCase.execute).toHaveBeenCalledWith('single-article');
    });
  });

  describe('POST /articles/search', () => {
    it('should search articles by title', async () => {
      const articles = [{ id: '1', title: 'Search Article' }];
      searchArticlesUseCase.execute.mockResolvedValue(articles);
      const response = await request(app.getHttpServer())
        .post('/articles/search')
        .send({ title: 'Search Article' })
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(articles);
      expect(searchArticlesUseCase.execute).toHaveBeenCalledWith('Search Article');
    });
  });
});
