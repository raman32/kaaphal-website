import { Request } from 'express';

export function extractAuthToken(req: Request): string | undefined {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const matches = authHeader.match(/bearer\s+(.+)$/i);
        if (matches) {
            return matches[1];
        }
    }
}
