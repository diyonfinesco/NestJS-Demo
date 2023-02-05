import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUserDto';
import { ExtractJwt } from 'passport-jwt';
import { LoginUserDto } from './dto/LoginUserDto';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async register(createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.create(createUserDto) as UserDocument
            const token = await this.createTokenForUser(user)

            return { user, token };

        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(),
                description: error.message
            })
        }
    }

    public async login({ email, password }: LoginUserDto) {
        try {
            const user = await this.userService.findByCredentials(email, password) as UserDocument
            const token = await this.createTokenForUser(user)

            return { user, token };
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(),
                description: error.message
            })
        }
    }

    public async logout(@Req() req) {
        try {
            const { _id } = req.user.data
            const currentToken = req.headers.authorization.replace("Bearer ", "")
            const user = await this.userService.findAuthenticatedUser(_id, currentToken) as UserDocument

            user.tokens = user.tokens.filter((token) => {
                return token.token !== currentToken
            });

            await user.save();
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(),
                description: error.message
            })
        }
    }

    public async findByCredentials(email: string, pass: string): Promise<User> {
        return await this.userService.findByCredentials(email, pass);
    }

    public async validateUser(id: string, token: string): Promise<User> {
        return await this.userService.findAuthenticatedUser(id, token)
    }

    /**
    * PRIVATE METHODS
    */

    private async concatTokenToUser(user: UserDocument, token: string) {
        user.tokens = user.tokens.concat({ token });
        await user.save()
    }

    private async createTokenForUser(user: UserDocument) {
        const token = this.jwtService.sign({ id: user._id.toString() })
        await this.concatTokenToUser(user, token)
        return token
    }
}