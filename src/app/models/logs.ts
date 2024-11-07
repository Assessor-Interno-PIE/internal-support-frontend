import { User } from "./user";
import { Document } from './document';

export class Logs {
    id!: number;
    endpoint!: string;
    document!: Document;
    method!: string;
    status!: string;
    user!: User;

    constructor(id: number, endpoint: string, document: Document,
        method: string, status: string, user: User
    ){
        this.id = id;
        this.endpoint = endpoint;
        this.document = document;
        this.method = method;
        this.status = status;
        this.user = user;
    }
}
