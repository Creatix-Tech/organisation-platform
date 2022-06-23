import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/user/roles.enumt';

export const Role = (role: Roles) => SetMetadata('role', role);