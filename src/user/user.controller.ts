import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Roles } from './roles.enumt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';

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
    async editUser(@Query('id') id: string, @Body() updtateInfo: UpdateUserDto) {
        console.log(id);
        return await this.userService.updateUser(id, updtateInfo);
    }


}
