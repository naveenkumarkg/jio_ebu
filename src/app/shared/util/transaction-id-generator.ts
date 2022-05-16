/* istanbul ignore next */
import { environment } from '../../../environments/environment';

export class TransactionIdGenerator {
    static generateTransactionId(): string {
        const dateTime: number = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * Math.floor(1000000));
        const fourRandomDigits = randomNumber.toString().substring(0, 6);

        if (environment.GENERATE_PROD_TRANSACTION_ID === true) {
            return 'EBU-Prepaid-PD' + dateTime + '' + fourRandomDigits;
        }
        return 'EBU-Prepaid-PP' + dateTime + '' + fourRandomDigits;
    }
}
