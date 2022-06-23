import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { ServiceConfig } from 'src/common/configservice';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    imports: [CommonModule],
    useFactory: async (serviceConfig: ServiceConfig) => ({
      secret: serviceConfig.jwtSecret,
      signOptions: {
        expiresIn: serviceConfig.jwtExpiresIn,
      },
    }),
    inject: [ServiceConfig],
  })],
  providers: [ServiceConfig, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
