import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { File } from '../../../models/file.model';
import { GraphQLUpload } from 'graphql-upload';
import { AssetsService } from '../../../services/asset.service';
import { FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import { Stream } from 'stream';
import { GraphQLBoolean } from 'graphql';
@Resolver(() => File)
export class AssetsResolver {
    constructor(private readonly assetService: AssetsService) { }

    @Mutation(() => File)
    async createAsset(
        @Args('file', { type: () => GraphQLUpload }) args: FileUpload,
    ): Promise<File> {
        const asset = await this.assetService.create(args);
        return asset;
    }
    @Mutation(() => GraphQLBoolean)
    async createAssetOnServer(
        @Args('file', { type: () => GraphQLUpload }) args: FileUpload,
    ): Promise<boolean> {
        console.log(args)
        const { createReadStream, filename, mimetype, encoding } = args;
        const stream = createReadStream() as Stream;
        const writer = fs.createWriteStream('image.png')
        stream.pipe(writer);
        writer.on("finish", () => console.log("findish"))
        return true;
    }
}
