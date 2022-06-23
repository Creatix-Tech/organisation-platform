import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';


import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Organization } from 'src/organization/organization.entity';
import { Roles } from './roles.enumt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ) { }

    async createUser(dto: UserDto): Promise<User> {
        const user = await this.repo.create({
            name: dto.name,
            age: dto.age,
            email: dto.email,
            password: dto.password,
            role: (dto.isAdmin ? Roles.Admin : Roles.User)
        })

        return await this.repo.save(user);
    }

    async login(username: string): Promise<User> {
        return await this.findOne(username);
    }

    async updateUser(id: number, updInfo: UpdateUserDto): Promise<UpdateResult> {
        const updResult = await this.repo.update(id, updInfo)
        if (!updResult) {
            throw new BadRequestException("nu such user with provided id");
        }
        return updResult;
    }

    async findOne(email: string): Promise<User> {
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException("nu such user with provided email");
        }
        return user;
    }

    async getRole(email: string): Promise<"ADMIN" | "USER"> {
        const user = await this.findOne(email);
        return user.role;
    }

    async getOrgList(id: string): Promise<Organization[]> {
        const userId = parseInt(id);
        const user = await this.repo.findOne({ where: { id: userId }, relations: ['orgList'] });
        console.log(user)
        if (!user) {
            throw new BadRequestException("nu such user with provided id");
        }
        return user.orgList;
    }
}
