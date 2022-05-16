export class Documents {
    constructor(public type: string, public documentDetails: DocumentDetails) {}
}
export class BusinessDocument {
    constructor(
        public transactionId: string,
        public sourceIdentifier: string,
        public routingIdentifier: string,
        public documentDetails: DocumentDetails
    ) {}
}

export class DocumentDetails {
    constructor(
        public name: string,
        public type: string,
        public content: string,
        public author: string,
        public securityGroup: string,
        public metadata: FileMetaData[]
    ) {}
}

export class FileMetaData {
    constructor(public name: string, public value: string) {}
}

export class RemoveDocument {
    constructor(public transactionId: string, public sourceIdentifier: string, public documentDetails: { documentId: string }) {}
}

export class BusinessOwnerDetails {
    constructor(public businessname: string, public registrationId: string, public documentdetails: BusinessDocument) {}
}
export class Business {
    constructor(public transactionId: string, public sourceChannel: string, public userDetails: UserDetails) {}
}

export class UserDetails {
    constructor(
        public customerName: string,
        public customerSurname: string,
        public customerContactNumber: string,
        public workTitle: string,
        public businessName: string,
        public idType: string,
        public idNumber: string,
        public isCustomerLinkToPrimary: boolean,
        public businessReferenceNumber: string,
        public termsAndConditions: boolean,
        public channelName: string,
        public businessValidationDocument: DocumentRefs,
        public customerIdDocument: DocumentRefs,
        public businessSupportingDocuments: DocumentRefs,
        public accountIdentifier?: string,
        public brcAgentNumber?: string,
        public informalAgentNumber?: string
    ) {}
}

export class DocumentRefs {
    constructor(public documentId1: string) {}
}
