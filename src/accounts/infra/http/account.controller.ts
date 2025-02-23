import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    ConflictException
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from 'src/accounts/application/auth.usecase';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';
import { Role } from 'src/accounts/application/roles/role.enum';
import { Roles } from 'src/accounts/application/roles/roles.decorator';
import { CreateAccountUseCase } from 'src/accounts/application/create-account.usecase';
import { CreateAccountDto } from '../dto/create-account.dto';
import { GetAllAccountsUseCase } from 'src/accounts/application/get-all-accounts.usecase';
import { RolesGuard } from 'src/accounts/application/guards/roles.guard';

@Controller('/account')
@ApiTags('Account')
export class AccountController {
    constructor(
       private authUseCase: AuthUseCase,
       private createAccountUseCase: CreateAccountUseCase,
       private readonly getAllAccountsUseCase: GetAllAccountsUseCase,
    ) { }

    @Post('login')
    login(@Body() signInDto: Record<string, any>) {
      return this.authUseCase.login(signInDto.username, signInDto.password);
    }

    @Get('all')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getAll(@Request() request) {
      return await this.getAllAccountsUseCase.execute();
    }

    @Post('create')
    async create(@Body() createAccountDto: CreateAccountDto) {
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

    @Post('update')
    async update() {
        return 'Hello World';
    }

    @Get('/health')
    async healthCheck() {
        return 'Hello World2';
    }

}


