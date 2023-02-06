import { Controller, Request, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async register(@Body() createUserDto: Readonly<CreateUserDto>) {
        return await this.authService.register(createUserDto)
    }

    @HttpCode(200)
    @Post('/login')
    async login(@Body() loginUserDto: Readonly<LoginUserDto>) {
        return await this.authService.login(loginUserDto);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Request() req) {
        return await this.authService.logout(req)
    }
}