import { Document } from './document';

export class Category {
    id!: number;
    name!: string;
    documents: Document[];

    constructor(id: number, name: string,
        documents: Document[]
    ){
        this.id = id;
        this.name = name;
        this.documents = documents;
    }
}
