import { Controller } from '@nestjs/common';
import { Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDto } from 'src/user/dtos/user.dto';
import { LoginUserDto } from 'src/user/dtos/loginUser.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sign-up')
    async createUser(@Body() dto: UserDto) {
        return await this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto.username);
    }
}
