import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/accounts/application/guards/auth.guard';

@Controller('/account')
@ApiTags('Account')
export class AccountController {
    constructor(
       
    ) { }

    @Get('')
    @UseGuards(AuthGuard)
    getAll(@Request() request) {
        return request.user
    }

    @Post('')
    create() {
        return 'Hello World';
    }
}