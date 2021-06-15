import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventBus } from '../event-bus/event-bus';
import { host } from '../../utils/GlobalConstants';
import { NotificationEvent } from '../event-bus/events/notification.event';
import { PrismaService } from './prisma.service';

@Injectable()
export class NotificationService {
    constructor(private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private eventBus: EventBus,
    ) { }

    onModuleInit(): void {
        const notificationEvent$ = this.eventBus.ofType(NotificationEvent);
        merge(notificationEvent$)
            .pipe(debounceTime(50))
            .subscribe(async (event: NotificationEvent) => {
                this.createNotification({ slug: event.slug, body: event.body, userId: event.userId, postId: event.postId });
            });
    }
    async createNotification({ slug, body, userId, postId }: { slug?: string, body: string, userId: string, postId?: string }): Promise<void> {
        const url = host + '/post/' + slug;
        await this.prisma.notification.create({
            data: {
                body: body,
                userId: userId,
                postId: postId ? postId : undefined,
                url: slug ? url : undefined
            }
        })
        console.log("Notification Created")
    }

    createNotifications({ users }: { users: string[] }) {
        //TODO create bulk notifications
    }
}
