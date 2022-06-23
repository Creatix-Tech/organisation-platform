import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }

        return null;
    }

    async login(email: string): Promise<{
        access_token: string;
    }> {
        const user = await this.userService.login(email);
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(dto: UserDto): Promise<User> {
        let user;
        try {
            user = await this.userService.findOne(dto.email);
        } catch (ex: any) { }
        if (user) {
            throw new BadRequestException('exist')
        }
        return user = await this.userService.createUser(dto);
    }
}
