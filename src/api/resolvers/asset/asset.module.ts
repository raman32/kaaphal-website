import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { AssetsResolver } from './asset.resolver';
//TODO CONVERT THIS RESOLVER TO USE APOLLO GRPAHQL UPLOAD
@Module({
    imports: [ServicesModule],
    providers: [AssetsResolver],
})
export class AssetsModule { }
