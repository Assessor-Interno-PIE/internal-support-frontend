import { Timestamp } from "rxjs";
import { Category } from "./category";
import { Department } from "./department";
import { User } from "./user";

export class Document {
    id!: number;
    title!: string;
    content!: string;
    department!: Department;
    category!: Category;
    // =================
    // pode usar STRING também invez de Timestamp
    createdAt!: Timestamp<T>; 
    // const document = new Document();
    // document.createdAt = new Date().toISOString(); // Exemplo de atribuição de data
    updatedAt!: Timestamp<T>;  // pode usar STRING também invez de Timestamp
    // document.updatedAt = new Date().toISOString(); // Exemplo de atribuição de data
    // =================
    // Formato de Data: Se você for armazenar datas como strings,
    // considere o formato padrão como ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) 
    // para garantir que as datas sejam tratadas corretamente ao longo do Projeto.
    // =================
    user!: User;

    constructor(id: number, title: string, content: string,
        department: Department, category: Category,
        createdAt: Timestamp<T>, updatedAt: Timestamp<T>, user: User
    ){
        this.id = id;
        this.title = title;
        this.content = content;
        this.department = department;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }
}
