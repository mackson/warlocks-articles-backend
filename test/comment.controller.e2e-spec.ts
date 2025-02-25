import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CommentController } from '../src/articles/infra/http/comment.controller';
import { AuthGuard } from '../src/accounts/application/guards/auth.guard';
import { CreateCommentUseCase } from '../src/articles/application/create-comment.usecase';
import { UpdateCommentUseCase } from '../src/articles/application/update-comment.usecase';
import { DeleteCommentUseCase } from '../src/articles/application/delete-comment.usecase';
import { GetAllCommentsUseCase } from '../src/articles/application/get-all-comments.usecase';
import { GetOneCommentUseCase } from '../src/articles/application/get-one-comment.usecase';

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  const createCommentUseCase = { execute: jest.fn() };
  const updateCommentUseCase = { execute: jest.fn(), updateLikes: jest.fn() };
  const deleteCommentUseCase = { execute: jest.fn() };
  const getAllCommentsUseCase = { execute: jest.fn() };
  const getOneCommentUseCase = { execute: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        { provide: CreateCommentUseCase, useValue: createCommentUseCase },
        { provide: UpdateCommentUseCase, useValue: updateCommentUseCase },
        { provide: DeleteCommentUseCase, useValue: deleteCommentUseCase },
        { provide: GetAllCommentsUseCase, useValue: getAllCommentsUseCase },
        { provide: GetOneCommentUseCase, useValue: getOneCommentUseCase },
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

  describe('POST /comments/create', () => {
    it('should create a comment', async () => {
      const mockComment = { id: '1', text: 'Test comment' };
      createCommentUseCase.execute.mockResolvedValue(mockComment);
      const response = await request(app.getHttpServer())
        .post('/comments/create')
        .send({ articleId: 'article1', text: 'Test comment' })
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(mockComment);
      expect(createCommentUseCase.execute).toHaveBeenCalledWith(
        'article1',
        { articleId: 'article1', text: 'Test comment' },
        'fake-user-id'
      );
    });
  });

  describe('PUT /comments/update/:articleId/:commentId', () => {
    it('should update a comment', async () => {
      const updatedComment = { id: '1', text: 'Updated comment' };
      updateCommentUseCase.execute.mockResolvedValue(updatedComment);
      const response = await request(app.getHttpServer())
        .put('/comments/update/article1/1')
        .send({ text: 'Updated comment' })
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(updatedComment);
      expect(updateCommentUseCase.execute).toHaveBeenCalledWith(
        'article1',
        '1',
        { text: 'Updated comment' },
        'fake-user-id'
      );
    });
  });

  describe('DELETE /comments/delete/:commentId', () => {
    it('should delete a comment', async () => {
      deleteCommentUseCase.execute.mockResolvedValue(undefined);
      const response = await request(app.getHttpServer())
        .delete('/comments/delete/1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({ message: 'Comment deleted successfully' });
      expect(deleteCommentUseCase.execute).toHaveBeenCalledWith('1', 'fake-user-id');
    });
  });

  describe('GET /comments/all/:articleId', () => {
    it('should return all comments for an article', async () => {
      const comments = [
        { id: '1', text: 'Comment 1' },
        { id: '2', text: 'Comment 2' },
      ];
      getAllCommentsUseCase.execute.mockResolvedValue(comments);
      const response = await request(app.getHttpServer())
        .get('/comments/all/article1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(comments);
      expect(getAllCommentsUseCase.execute).toHaveBeenCalledWith('article1');
    });
  });

  describe('GET /comments/:id', () => {
    it('should return a single comment', async () => {
      const comment = { id: '1', text: 'Single comment' };
      getOneCommentUseCase.execute.mockResolvedValue(comment);
      const response = await request(app.getHttpServer())
        .get('/comments/1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(comment);
      expect(getOneCommentUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('GET /comments/like/:articleId/:commentId', () => {
    it('should update comment likes', async () => {
      updateCommentUseCase.updateLikes.mockResolvedValue(undefined);
      const response = await request(app.getHttpServer())
        .get('/comments/like/article1/1')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({ message: 'Comment likes updated successfully' });
      expect(updateCommentUseCase.updateLikes).toHaveBeenCalledWith(
        'article1',
        '1',
        'fake-user-id'
      );
    });
  });
});
