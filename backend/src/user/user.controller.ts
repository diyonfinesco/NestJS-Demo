import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLE } from 'src/common/enums';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles(ROLE.CUSTOMER)
    @Get('/example')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async ado(@Request() req) {
        try {
            return req.user
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(),
                description: error.message
            })
        }
    }
}
