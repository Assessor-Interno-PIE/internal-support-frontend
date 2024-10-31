import { User } from "./user";

export class Department {
    id!: number;
    name!: string;
    documents!: Document[];
    users!: User[];

    constructor(id:number, name:string,
        documents: Document[], users: User[]
    ){
        this.id = id;
        this.name = name;
        this.documents = documents;
        this.users = users;
    }
}
