import { Module } from '@nestjs/common';
import { ServiceConfig } from './configservice';
@Module({
    providers: [ServiceConfig],
    exports: [ServiceConfig],
})
export class CommonModule { }
