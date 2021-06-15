import { KaaphalEvent } from '../kaaphal.event';

export class NotificationEvent extends KaaphalEvent {
    constructor(public body: string, public userId: string, public slug?: string, public postId?: string,) {
        super();
    }
}
