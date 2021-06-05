export interface PreviewStrategy {
    generatePreviewImage(
        mimeType: string,
        data: Buffer,
        maxHeight: number,
        maxWidth: number,
    ): Promise<Buffer>;
}
