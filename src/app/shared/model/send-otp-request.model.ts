export class SendOtpRequest {
    constructor(
        public transactionId: string,
        public sourceIdentifier: string,
        public notificationType: string,
        public notificationIdentifier: string,
        public pinLength: number,
        public otpKey: string,
        public timeToLive: number,
        public messageDetails: object
    ) {}
}
