import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async delete(id: string) {
        const deletedCat = await this.userModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedCat;
    }

    async findByCredentials(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email })
        if (!user) throw new BadRequestException(`The email address or the password that you've entered is invalid!`);

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) throw new BadRequestException(`The email address or the password that you've entered is invalid!`);

        return user
    };

    async findAuthenticatedUser(_id: string, token: string): Promise<User> {
        const user = await this.userModel.findOne({ _id, 'tokens.token': token })
        if (!user) throw new UnauthorizedException('User not found!');
        return user
    };
}