import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';

@Controller('/account')
@ApiTags('Account')
export class AccountController {
    constructor(
       
    ) { }

    @Get('')
    getAll() {
        return 'Hello World';
    }

    @Post('')
    create() {
        return 'Hello World';
    }
}