import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AccountController } from '../src/accounts/infra/http/account.controller';
import { AuthUseCase } from '../src/accounts/application/auth.usecase';
import { AuthGuard } from '../src/accounts/application/guards/auth.guard';
import { CreateAccountUseCase } from '../src/accounts/application/create-account.usecase';
import { GetAllAccountsUseCase } from '../src/accounts/application/get-all-accounts.usecase';
import { UpdateAccountUseCase } from '../src/accounts/application/update-account.usecase';
import { CreateProfileUseCase } from '../src/accounts/application/create-profile.usecase';
import { UpdateProfileUseCase } from '../src/accounts/application/update-profile.usecase';
import { GetProfileUseCase } from '../src/accounts/application/get-profile.usecase';
import { RolesGuard } from '../src/accounts/application/guards/roles.guard';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  const authUseCase = { login: jest.fn() };
  const createAccountUseCase = { execute: jest.fn() };
  const createProfileUseCase = { execute: jest.fn() };
  const updateAccountUseCase = { execute: jest.fn() };
  const updateProfileUseCase = { execute: jest.fn() };
  const getAllAccountsUseCase = { execute: jest.fn() };
  const getProfileUseCase = { execute: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        { provide: AuthUseCase, useValue: authUseCase },
        { provide: CreateAccountUseCase, useValue: createAccountUseCase },
        { provide: CreateProfileUseCase, useValue: createProfileUseCase },
        { provide: UpdateAccountUseCase, useValue: updateAccountUseCase },
        { provide: UpdateProfileUseCase, useValue: updateProfileUseCase },
        { provide: GetAllAccountsUseCase, useValue: getAllAccountsUseCase },
        { provide: GetProfileUseCase, useValue: getProfileUseCase },
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
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /account/login', () => {
    it('should login', async () => {
      const result = { token: 'fake-token' };
      authUseCase.login.mockResolvedValue(result);
      const response = await request(app.getHttpServer())
        .post('/account/login')
        .send({ email: 'testuser@example.com', password: 'testpass' })
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(result);
      expect(authUseCase.login).toHaveBeenCalledWith('testuser@example.com', 'testpass');
    });
  });

  describe('GET /account/all', () => {
    it('should return all accounts', async () => {
      const accounts = [{ id: '1', username: 'user1' }, { id: '2', username: 'user2' }];
      getAllAccountsUseCase.execute.mockResolvedValue(accounts);
      const response = await request(app.getHttpServer())
        .get('/account/all')
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(accounts);
      expect(getAllAccountsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('POST /account/create', () => {
    it('should create an account', async () => {
      const accountDto = { username: 'newuser', password: 'newpass' };
      const account = { id: '1', username: 'newuser' };
      createAccountUseCase.execute.mockResolvedValue(account);
      const response = await request(app.getHttpServer())
        .post('/account/create')
        .send(accountDto)
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(account);
      expect(createAccountUseCase.execute).toHaveBeenCalledWith(accountDto);
    });
  });

  describe('POST /account/signup', () => {
    it('should signup', async () => {
      const accountDto = { username: 'signupuser', password: 'signuppass' };
      const account = { id: '2', username: 'signupuser' };
      createProfileUseCase.execute.mockResolvedValue(account);
      const response = await request(app.getHttpServer())
        .post('/account/signup')
        .send(accountDto)
        .expect(HttpStatus.CREATED);
      expect(response.body).toEqual(account);
      expect(createProfileUseCase.execute).toHaveBeenCalledWith(accountDto);
    });
  });

  describe('PUT /account/update', () => {
    it('should update an account', async () => {
      const updateDto = { username: 'updateduser' };
      const updatedAccount = { id: '1', username: 'updateduser' };
      updateAccountUseCase.execute.mockResolvedValue(updatedAccount);
      const payload = { accountId: '1', ...updateDto, confirmPassword: 'newpass' };
      const response = await request(app.getHttpServer())
        .put('/account/update')
        .send(payload)
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(updatedAccount);
      expect(updateAccountUseCase.execute).toHaveBeenCalledWith('1', payload, 'newpass');
    });
  });

  describe('PUT /account/updateprofile', () => {
    it('should update a profile', async () => {
      const updateDto = { username: 'updatedprofile' };
      const updatedProfile = { id: '1', username: 'updatedprofile' };
      updateProfileUseCase.execute.mockResolvedValue(updatedProfile);
      const payload = { accountId: '1', ...updateDto, confirmPassword: 'newpass' };
      const response = await request(app.getHttpServer())
        .put('/account/updateprofile')
        .send(payload)
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(updatedProfile);
      expect(updateProfileUseCase.execute).toHaveBeenCalledWith('1', payload, { sub: 'fake-user-id' }, 'newpass');
    });
  });

  describe('GET /account/profile/:accountId', () => {
    it('should return a profile', async () => {
      // Mock do perfil retornado pela Use Case
      const profile = { email: 'profileuser@example.com' };
      getProfileUseCase.execute = jest.fn().mockResolvedValue(profile);

      const response = await request(app.getHttpServer())
        .get('/account/profile/fake-user-id')
        .set('Authorization', `Bearer fake-token`) // Simula um token JWT válido
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(profile);
      expect(getProfileUseCase.execute).toHaveBeenCalledWith('fake-user-id', expect.any(String));
    });
  });

  describe('GET /account/health', () => {
    it('should return health status', async () => {
      const response = await request(app.getHttpServer())
        .get('/account/health')
        .expect(HttpStatus.OK);
      expect(response.text).toEqual('App is healthy');
    });
  });
});
