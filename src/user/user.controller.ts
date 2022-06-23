import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards, Request } from '@nestjs/common';
import { Roles } from './roles.enumt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/current')
    getUser(@Request() req) {
        return req.user;
    }

    @Role(Roles.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/edit')
    async editUser(@Param() id: number, @Body() updtateInfo: UpdateUserDto) {
        return await this.userService.updateUser(id, updtateInfo);
    }

    @Role(Roles.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/org-list')
    async getOrgs(@Query('id') id: string) {
        return await this.userService.getOrgList(id);
    }
}
