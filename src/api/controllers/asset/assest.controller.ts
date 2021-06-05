import { Controller, Get, Next, Param, Req, Res } from '@nestjs/common';
import path from 'path';
import { ImageTransformPreset } from '../../../common';
import { fromBuffer } from 'file-type';
import { AssetsService } from '../../../services/asset.service';

@Controller('assets')
export class AssetsController {
    private presets: ImageTransformPreset[] = [
        { name: 'tiny', width: 50, height: 50, mode: 'crop' },
        { name: 'thumb', width: 150, height: 150, mode: 'crop' },
        { name: 'small', width: 300, height: 300, mode: 'resize' },
        { name: 'medium', width: 500, height: 500, mode: 'resize' },
        { name: 'large', width: 800, height: 800, mode: 'resize' },
    ];
    private readonly cacheDir = 'cache';

    constructor(private readonly assetService: AssetsService) { }

    @Get(':key')
    async sendAsset(@Req() req, @Res() res, @Next() next, @Param('key') key) {
        try {
            const file = await this.assetService.sendAsset(key);
            let mimetype = this.getMimeType(key);
            if (!mimetype) {
                mimetype = (await fromBuffer(file))?.mime || 'application/octet-stream';
            }
            res.contentType(mimetype);
            res.send(file);
        } catch (e) {
            const err = new Error('file not found');
            (err as any).status = 404;
            return next(err);
        }
    }

    private getMimeType(fileName: string): string | undefined {
        const ext = path.extname(fileName);
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            case 'svg':
                return 'image/svg+xml';
            case 'tiff':
                return 'image/tiff';
            case 'webp':
                return 'image/webp';
        }
    }
}
