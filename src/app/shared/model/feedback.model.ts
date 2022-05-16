export class FeedbackRequest {
    constructor(
        public transactionId: string,
        public sourceIdentifier: string,
        public msisdn: string,
        public rating: number,
        public additionalFeedback: string,
        public feedbackDateTime: string,
        public feedbackKeywords: FeedbackDate[]
    ) {}
}

export class FeedbackDate {
    constructor(public keyword: string) {}
}
