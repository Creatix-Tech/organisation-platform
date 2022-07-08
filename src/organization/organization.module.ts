import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';


import { UserModule } from 'src/user/user.module';
import { OrganizationController } from './organization.controller';
import { OrganizationSchema } from './organization.schema';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DynamooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]), UserModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService]
})
export class OrganizationModule { }
