export class SingUpInfo {
    constructor(public transactionId: string, public sourceIdentifier: string, public msisdn: string) {}
}

export class MasterAccountsDetails {
    constructor(public transactionId: string, public sourceIdentifier: string, public customerIdentifier: string, public msisdn: string) {}
}
