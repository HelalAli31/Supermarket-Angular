import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const CATEGORY_URL = 'http://localhost:5000/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpClient) {}
  getCategories() {
    return this.httpService.get(CATEGORY_URL).toPromise();
  }
}
