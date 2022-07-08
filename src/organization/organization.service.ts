import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { randomUUID } from 'crypto';
import { Document } from 'nestjs-dynamoose';


import { OrganizationDto } from './dtos/organization.dto';
import { UserService } from 'src/user/user.service';
import { UserOfOrg } from './dtos/userOfOrg.dto';
import { Organization, OrganizationKey } from './organization.interface';


@Injectable()
export class OrganizationService {
    constructor(
        private userService: UserService,
        @InjectModel('Organization') private orgModel: Model<Organization, OrganizationKey>
    ) { }

    async createOrganizaiton(dto: OrganizationDto): Promise<Organization> {
        return await this.orgModel.create({ id: randomUUID(), members: [], ...dto });
    }

    async deleteOrganization(orgName: string): Promise<void> {
        const org = await this.findByName(orgName);
        return await this.orgModel.delete(org);
    }

    async addUser(dto: UserOfOrg): Promise<Organization> {
        const user = await this.userService.findOne(dto.uEmail);
        const org = await this.findByName(dto.orgName);
        const populatedOrg = await org.populate();
        const contains = populatedOrg.members.find(matchUser => matchUser.id === user.id)

        if (contains) {
            throw new BadRequestException(`User:${user.name} Alredy member of this Organization`)
        }

        populatedOrg.members.push(user);
        user.orgList.push({ id: org.id })

        await this.orgModel.update(org);
        await this.userService.saveUser(user);
        return populatedOrg;
    }

    async deleteUser(dto: UserOfOrg): Promise<Organization> {
        const user = await this.userService.findOne(dto.uEmail);
        const org = await (await this.findByName(dto.orgName)).populate();

        org.members = org.members.filter(usr => {
            return usr.id !== user.id;
        });
        user.orgList = user.orgList.filter(organization => {
            return organization.id !== org.id;
        });

        await this.userService.saveUser(user);
        return await this.orgModel.update(org);
    }

    async findByName(orgName: string): Promise<Document<Organization>> {
        const org = (await this.orgModel.scan({ name: { contains: orgName } }).exec()).pop()

        if (!org) {
            throw new BadRequestException("No such organizaiton wih provided orgName")
        }
        return org;
    }

    async getOrgList(id: string): Promise<Organization[]> {
        const user = await this.userService.findById({ id });
        return await this.getOrgs(user.orgList);
    }

    async getOrgs(orgIds: OrganizationKey[]): Promise<Organization[]> {
        return await this.orgModel.batchGet(orgIds);
    }
}
