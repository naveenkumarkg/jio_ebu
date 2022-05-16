export class ValidateOtpRequest {
    constructor(public transactionId: string, public sourceIdentifier: string, public otpKey: string, public otpReceived: string) {}
}
