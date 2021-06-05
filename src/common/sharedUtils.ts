import { AssetType } from './sharedType';

export function getAssetType(mimeType: string): AssetType {
    const type = mimeType.split('/')[0];
    switch (type) {
        case 'image':
            return AssetType.IMAGE;
        case 'video':
            return AssetType.VIDEO;
        default:
            return AssetType.BINARY;
    }
}

export function normalizeString(input: string, spaceReplacer = ' '): string {
    return (input || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[!"£$%^&*()+[\]{};:@#~?\\/,|><`¬'=]/g, '')
        .replace(/\s+/g, spaceReplacer);
}
