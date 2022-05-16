/* istanbul ignore next */
export class ErrorResponseService {
    public message: string;
    public name: string;
    public ok: boolean;
    public status: number;
    public statusText: string;
    public url: string;

    constructor(message: string, name: string, ok: boolean, status: number, statusText: string, url: string) {
        this.message = message;
        this.name = name;
        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }
}
