import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Organization } from './organization.entity';
import { OrganizationDto } from './dtos/organization.dto';
import { UserService } from 'src/user/user.service';
import { UserOfOrg } from './dtos/userOfOrg.dto';

@Injectable()
export class OrganizationService {
    constructor(
        private userService: UserService,
        @InjectRepository(Organization) private repo: Repository<Organization>
    ) { }

    async createOrganizaiton(dto: OrganizationDto): Promise<Organization> {
        const org = await this.repo.create({ ...dto });
        return await this.repo.save(org);
    }

    async deleteOrganization(orgName: string): Promise<void> {
        const delResult = await this.repo.delete({ name: orgName });

        if (!delResult) {
            throw new BadRequestException("No such organizaiton wih provided orgName")
        }
        return;
    }

    async addUser(dto: UserOfOrg): Promise<Organization> {
        const user = await this.userService.findOne(dto.uEmail);
        const org = await this.findByName(dto.orgName);
        const contains = org.members.includes(user);

        if (contains) {
            throw new BadRequestException(`User:${user.name} Alredy member of this Organization`)
        }
        org.members.push(user);
        await this.repo.save(org);
        return org;
    }

    async deleteUser(dto: UserOfOrg): Promise<Organization> {
        const user = await this.userService.findOne(dto.uEmail);
        const org = await this.findByName(dto.orgName);

        org.members = org.members.filter(usr => {
            return usr.id !== user.id;
        })
        return await this.repo.save(org);
    }

    async findByName(name: string): Promise<Organization> {
        const org = await this.repo.findOne({ where: { name }, relations: ['members'] });

        if (!org) {
            throw new BadRequestException("No such organizaiton wih provided orgName")
        }
        return org;
    }
}
