import { Department } from "./department";

export class User {
    id!: number;
    name!: string;
    username!: string;
    password!: string;
    department!: Department;
    isAdmin!: number;

    constructor(id: number, name: string, username:string,
        password: string, department: Department,
        isAdmin: number
    ){
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.department = department;
        this.isAdmin = isAdmin;
    }
}