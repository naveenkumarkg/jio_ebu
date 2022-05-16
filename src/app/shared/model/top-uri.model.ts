import { Uri } from './uri.model';
/* istanbul ignore next */
export class TopUri extends Uri {
    public below: Array<Uri>;

    constructor(title: string, description: string, uri: string, below: Array<Uri>) {
        super(title, description, uri);
        this.title = title;
        this.description = description;
        this.uri = uri;
        this.below = below;
    }
}
