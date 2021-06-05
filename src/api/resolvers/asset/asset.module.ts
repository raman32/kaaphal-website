import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { AssetsResolver } from './asset.resolver';

@Module({
    imports: [ServicesModule],
    providers: [AssetsResolver],
})
export class AssetsModule { }
