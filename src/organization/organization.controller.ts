import { Body, Controller, Post, Patch, Put, UseGuards, Delete } from '@nestjs/common';


import { UserOfOrg } from './dtos/userOfOrg.dto';
import { OrganizationDto } from './dtos/organization.dto';
import { OrganizationService } from './organization.service';
import { Role } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/user/roles.enumt';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService) { }

    @Role(Roles.Admin)
    @Post()
    async createOrg(@Body() dto: OrganizationDto) {
        return await this.organizationService.createOrganizaiton(dto);
    }

    @Role(Roles.Admin)
    @Delete()
    async deleteOrg(@Body() orgName: string) {
        await this.organizationService.deleteOrganization(orgName);
        return `Successfully deleted ${orgName} from system`;
    }

    @Role(Roles.Admin)
    @Put()
    async addUser(@Body() dto: UserOfOrg) {
        return await this.organizationService.addUser(dto);
    }

    @Role(Roles.Admin)
    @Patch()
    async delUser(@Body() dto: UserOfOrg) {
        return await this.organizationService.deleteUser(dto);
    }
}
