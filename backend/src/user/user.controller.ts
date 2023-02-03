import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto)
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(),
                description: error.message
            })
        }
    }
}
