import { Auth } from '../../api/common/dto/auth.dto';
import { KaaphalEvent } from '../kaaphal.event';
export class MagicLinkEvent extends KaaphalEvent {
    constructor(public token: string, public email: string) {
        super();
    }
}

export class MagicLinkVerificationEvent extends KaaphalEvent {
    constructor(
        public sessionToken: string,
        public authenticationData: { auth: Auth; isRegistered: boolean },
    ) {
        super();
    }
}
