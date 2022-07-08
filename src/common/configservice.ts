import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';
import { DynamoDB } from 'dynamoose/dist/aws/sdk';
import { aws } from 'dynamoose';
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

    dbConfig: DynamooseModuleOptions = {
        aws: {
            accessKeyId: this.configService.get<string>('ACCES_KEY'),
            secretAccessKey: this.configService.get<string>('SECRET_KEY'),
            region: this.configService.get<string>('REGION'),
        }
    }
}
