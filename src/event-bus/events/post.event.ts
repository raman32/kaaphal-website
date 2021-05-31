import { Post } from '.prisma/client';
import { KaaphalEvent } from '../kaaphal.event';

export class CreatePostEvents extends KaaphalEvent {
    constructor(public post: Post) {
        super();
    }
}

export class UpdatePostEvent extends KaaphalEvent {
    constructor(public post: Post) {
        super();
    }
}
