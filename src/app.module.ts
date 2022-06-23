import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { Organization } from './organization/organization.entity';
import { User } from './user/user.entity';
import { ServiceConfig } from './common/configservice';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [CommonModule],
    useFactory: async (configService: ServiceConfig) =>
      Object.assign(configService.dbConfig, {
        entities: [Organization, User],
      }),
    inject: [ServiceConfig],
  }),
    PassportModule,
    UserModule, OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
