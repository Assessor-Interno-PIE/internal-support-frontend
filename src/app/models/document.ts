import { Category } from "./category";
import { Department } from "./department";
import { User } from "./user";

export class Document {
    id!: number;
    title!: string;
    content!: string;
    department!: Department;
    category!: Category;
    createdAt!: string;
    updatedAt!: string;
    user!: User;
    showDetails!: boolean; // Adicionando a propriedade showDetails


    constructor(id: number, title: string, content: string,
        department: Department, category: Category,
        createdAt: string, updatedAt: string, user: User
    ){
        this.id = id;
        this.title = title;
        this.content = content;
        this.department = department;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.showDetails = false; // Inicializando como false
    }
}
