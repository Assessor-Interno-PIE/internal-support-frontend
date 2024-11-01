import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/categories");

  constructor() { }
  
  findAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Category>{
    return this.http.get<Category>(this.API+"/find-by-id/"+id);
  }

  save(category: Category): Observable<string>{
    return this.http.post<string>(this.API+"/save", category, {responseType: 'text' as 'json'});
  }

  update(category: Category): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+category.id, category, {responseType: 'text' as 'json'});
  }

  delete(category: Category): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+category.id, {responseType: 'text' as 'json'});
  }
}
