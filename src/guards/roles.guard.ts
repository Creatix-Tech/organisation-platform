import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { Roles } from 'src/user/roles.enumt';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole = this.reflector.get<Roles>('role', context.getHandler())
        const { user } = context.switchToHttp().getRequest();
        let role = await this.userService.getRole(user.email);
        return role === requiredRole || role === Roles.Admin;
    }
}