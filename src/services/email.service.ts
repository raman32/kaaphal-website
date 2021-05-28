import { Injectable } from '@nestjs/common';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventBus } from '../event-bus/event-bus';
import { MagicLinkEvent } from '../event-bus/events';
import { EmailGeneratorService } from './emailGenerator.service';

@Injectable()
export class EmailService {
    constructor(private eventBus: EventBus,
        private readonly emailGeneratorService: EmailGeneratorService) { }

    onModuleInit(): void {
        const magicLinkEvent$ = this.eventBus.ofType(MagicLinkEvent);
        merge(magicLinkEvent$)
            .pipe(debounceTime(50))
            .subscribe(async (event: MagicLinkEvent) => {
                this.sendMagicLink({ email: event.email, token: event.token });
            });
    }
    //TODO EMAIL service Implementation
    sendMagicLink({ token, email }: { token: string, email: string }): void {
        console.log(email, this.emailGeneratorService.generateMagicLinkEmail({ token }))
    }

}