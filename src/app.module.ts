import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { ServiceConfig } from './common/configservice';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  DynamooseModule.forRootAsync({
    imports: [CommonModule],
    useFactory: async (configService: ServiceConfig) => configService.dbConfig,
    inject: [ServiceConfig],
  }),
    PassportModule,
    UserModule, OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
