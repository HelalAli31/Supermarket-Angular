import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const CATEGORY_URL = 'http://localhost:5000/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public subject = new Subject<any>();
  constructor(private httpService: HttpClient) {}
  getCategories(limit?: number, from?: number) {
    const result = this.httpService
      .post(CATEGORY_URL, {
        Authorization: localStorage.getItem('token'),
        limit,
        from,
      })
      .toPromise();
    return result;
  }
  addCategory(category: any) {
    const categoryName = category?.name;
    return this.httpService
      .post(`${CATEGORY_URL}/addCategory`, {
        Authorization: localStorage.getItem('token'),
        categoryName,
      })
      .toPromise()
      .then(
        (value: any) => {
          this.subject.next(value);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  editCategoryName(category: any) {
    return this.httpService
      .post(`${CATEGORY_URL}/editCategoryName`, {
        Authorization: localStorage.getItem('token'),
        category,
      })
      .toPromise()
      .then(
        (value: any) => {
          this.subject.next(value);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  UpdateObservable() {
    return this.subject.asObservable();
  }
}
