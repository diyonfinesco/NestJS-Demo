import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userModel.create(createUserDto);
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async delete(id: string) {
        const deletedCat = await this.userModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedCat;
    }
}

