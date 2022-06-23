import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class ServiceConfig {
    constructor(private configService: ConfigService) { }

    jwtSecret: string = this.configService.get<string>('JWT_SECRET');
    jwtExpiresIn: number = this.configService.get<number>('JWT_EXPIRES_IN');

    swagger = {
        name: this.configService.get<string>('SWAGGER_NAME'),
        description: this.configService.get<string>('SWAGGER_DESCRIPTION'),
        version: this.configService.get<string>('SWAGGER_VERSION'),
        path: this.configService.get<string>('SWAGGER_PATH'),
    };

    dbConfig: DataSourceOptions = {
        type: 'postgres',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USER'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_SCHEMA'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
    };
}
