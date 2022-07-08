import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Document } from 'nestjs-dynamoose';
import { randomUUID } from 'crypto';


import { UserDto } from './dtos/user.dto';
import { User, UserKey } from './user.interface';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Roles } from './roles.enumt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User, UserKey>
    ) { }

    async createUser(dto: UserDto): Promise<Document<User>> {
        return await this.userModel.create({
            id: randomUUID(),
            name: dto.name,
            age: dto.age,
            email: dto.email,
            password: dto.password,
            role: (dto.isAdmin ? Roles.Admin : Roles.User),
            orgList: []
        })
    }

    async login(username: string): Promise<User> {
        return await this.findOne(username);
    }

    async updateUser(id: string, updInfo: UpdateUserDto): Promise<User> {
        const user = await this.findById({ id });
        const updResult = Object.assign(user, updInfo);
        return await this.userModel.update(updResult);
    }

    async findOne(userEmail: string): Promise<User> {
        const user = (await this.userModel.scan({ email: { contains: userEmail } }).exec()).pop()
        if (!user) {
            throw new BadRequestException("nu such user with provided email");
        }
        return user;
    }

    async getRole(email: string): Promise<"ADMIN" | "USER"> {
        const user = await this.findOne(email);
        return user.role;
    }

    async findById(id: UserKey): Promise<Document<User>> {
        const user = await this.userModel.get(id);
        if (!user) {
            throw new BadRequestException('nu such user with provided id');
        }
        return user;
    }


    async saveUser(user: User) {
        return await this.userModel.update(user);
    }
}
