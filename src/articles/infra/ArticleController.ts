import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';

@Controller('/article')
@ApiTags('Article')
export class UserController {
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