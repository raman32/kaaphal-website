export interface NamingStrategy {
    generateSourceFileName(
        originalFileName: string,
        conflictFileName?: string,
    ): string;
    generatePreviewFileName(
        sourceFileName: string,
        conflictFileName?: string,
    ): string;
}
