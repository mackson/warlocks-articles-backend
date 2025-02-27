import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    ConflictException,
    Put,
    NotFoundException,
    Param
} from '@nestjs/common';

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from 'src/accounts/application/auth.usecase';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
import { Role } from 'src/accounts/application/roles/role.enum';
import { Roles } from 'src/accounts/application/roles/roles.decorator';
import { CreateAccountUseCase } from 'src/accounts/application/create-account.usecase';
import { AccountDto } from '../dto/account.dto';
import { GetAllAccountsUseCase } from 'src/accounts/application/get-all-accounts.usecase';
import { RolesGuard } from 'src/accounts/application/guards/roles.guard';
import { UpdateAccountUseCase } from 'src/accounts/application/update-account.usecase';
import { CreateProfileUseCase } from 'src/accounts/application/create-profile.usecase';
import { UpdateProfileUseCase } from 'src/accounts/application/update-profile.usecase';
import { GetProfileUseCase } from 'src/accounts/application/get-profile.usecase';

@Controller('/account')
@ApiTags('Account')
export class AccountController {
  constructor(
    private authUseCase: AuthUseCase,
    private createAccountUseCase: CreateAccountUseCase,
    private createProfileUseCase: CreateProfileUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
    private updateProfileUseCase: UpdateProfileUseCase,
    private readonly getAllAccountsUseCase: GetAllAccountsUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) { }

  @Post('login')
  @ApiBody({ type: AccountDto })
  login(
    @Body('email') email: string, 
    @Body('password') password: string
  ) {
    return this.authUseCase.login(email, password);
  }

  @Get('all')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getAll() {
    return await this.getAllAccountsUseCase.execute();
  }

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createAccountDto: AccountDto) {
    try {
      const account = await this.createAccountUseCase.execute(createAccountDto);
      return account;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Post('signup')
  async signup(@Body() createAccountDto: AccountDto) {
    try {
      const account = await this.createProfileUseCase.execute(createAccountDto);
      return account;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Put('update')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Body('accountId') accountId: string, 
    @Body() updateAccountDto: Partial<AccountDto>, 
    @Body('confirmPassword') confirmPassword?: string
  ) {
    try {
      const account = await this.updateAccountUseCase.execute(accountId, updateAccountDto, confirmPassword);
      return account;
    } catch (error) {
      
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put('updateprofile')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  async updateProfile(
    @Body('accountId') accountId: string, 
    @Body() updateAccountDto: Partial<AccountDto>,
    @Request() req: any,
    @Body('confirmPassword') confirmPassword?: string
  ) {
    try {
      const account = await this.updateProfileUseCase.execute(accountId, updateAccountDto, req.account, confirmPassword);
      return account;
    } catch (error) {
      
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('/profile/:accountId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  async profile(
    @Param('accountId') accountId: string,
    @Request() req: any,
  ) {
    try {
      const profile = await this.getProfileUseCase.execute(accountId, req.account.sub);
      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('/checktoken')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Author, Role.Admin)
  async validate(@Request() req: any) {
    try {
      return req.account;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('health')
  async healthCheck() {
    return 'App is healthy';
  }

}


