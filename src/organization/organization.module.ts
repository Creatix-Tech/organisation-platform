import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserModule } from 'src/user/user.module';
import { OrganizationController } from './organization.controller';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), UserModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService]
})
export class OrganizationModule { }
