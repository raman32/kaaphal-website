import { Injectable } from "@nestjs/common";
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { Stream } from 'stream';
import { StorageStrategy } from '../common/strategy/assets/storage.strategy';
@Injectable()
export class S3StorageServive implements StorageStrategy {
    constructor(
        @InjectAwsService(S3) private readonly s3: S3,
    ) {
        this.ensureBucket();
    }

    private async ensureBucket() {
        let bucketExist = false;
        try {
            await this.s3.headBucket({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
            }).promise();
            bucketExist = true;
        } catch (e) {
            console.log(e);
        }
        if (!bucketExist) {
            try {
                await this.s3.createBucket({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                }).promise();
            } catch (e) {
                console.log(e);
            }
        }
    }


    private getObjectParams(identifier: string) {
        return {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: path.join(identifier.replace(/^\//, '')),
        };
    }
    async listBucketContents(identifier: string): Promise<string[]> {
        const response = await this.s3.listObjectsV2({ Bucket: this.getObjectParams(identifier).Bucket }).promise();
        return response.Contents.map(c => c.Key);
    }


    async deleteFile(identifier: string): Promise<void> {
        await this.s3.deleteObject(this.getObjectParams(identifier)).promise();
    }

    async fileExist(fileName: string): Promise<boolean> {
        try {
            await this.s3.headObject(this.getObjectParams(fileName)).promise();
            return true;
        } catch (e) {
            return false;
        }
    }

    async readFileToBuffer(identifier: string): Promise<Buffer> {
        const result = await this.s3.getObject(
            this.getObjectParams(identifier),
        ).promise();
        return Buffer.from(result.Body as Buffer);
    }

    async readFileToStream(identifier: string): Promise<Stream> {
        const result = await this.s3.getObject(
            this.getObjectParams(identifier),
        ).createReadStream();
        return result;
    }

    async writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
        const result = await this.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: data,
        }).promise();
        return result.Key;
    }

    async writeFileFromStream(fileName: string, data: Stream, ContentType: string): Promise<string> {
        const uploadEvent = this.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: data,
            ContentType: ContentType
        });
        const result = await uploadEvent.promise()
        return result.Key;
    }
}