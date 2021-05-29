import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const PRODUCTS_URL = 'http://localhost:5000/products';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public subject = new Subject<any>();

  constructor(private httpService: HttpClient) {}
  getProducts(
    from: number,
    limit: number,
    valueName?: string,
    keyName?: string
  ) {
    const queryParams =
      from >= 0 && limit ? `?from=${from}&limit=${limit}` : '';
    return this.httpService
      .post(`${PRODUCTS_URL}${queryParams}`, {
        valueName,
        keyName,
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
  }

  addProduct(product: any) {
    const Add_URL = `${PRODUCTS_URL}/addProduct`;
    const result = this.httpService
      .post(Add_URL, {
        product: product,
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    result.then(
      (value) => {
        console.log(value);
      },
      (reason) => {
        console.log(reason);
      }
    );
    return result;
  }

  updateProduct(product: any) {
    console.log(product);
    const UPDATE_URL = `${PRODUCTS_URL}/updateProduct`;
    const result = this.httpService
      .put(UPDATE_URL, {
        product,
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    result.then(
      (value) => {
        this.subject.next(value);
      },
      (reason) => {
        console.log(reason);
      }
    );
    return result;
  }

  getProductActionResult() {
    return this.subject.asObservable();
  }
}
