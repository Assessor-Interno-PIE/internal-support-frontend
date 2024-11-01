import { Accesslevel } from "./accesslevel";
import { Department } from "./department";
import { Document } from './document';

export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    department!: Department;
    viewed!: Document[];
    accesslevel!: Accesslevel;

    constructor(id: number, name: string, email:string,
        password: string, department: Department,
        viewed: Document[], accesslevel: Accesslevel
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.viewed = viewed;
        this.accesslevel = accesslevel
    }
}
