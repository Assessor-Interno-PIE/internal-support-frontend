import { Department } from "./department";

export class Document {
    id!: number;
    title!: string;
    department!: Department;
    description!: string;
    filePath!: string;

    constructor(id: number, title: string, department: Department,
        description: string, filePath: string
    ){
        this.id = id;
        this.title = title;
        this.department = department;
        this.description = description;
        this.filePath = filePath;
}
}