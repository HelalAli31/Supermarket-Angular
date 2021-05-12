import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PRODUCTS_URL = 'http://localhost:5000/products';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpService: HttpClient) {}
  getProducts(from: number, limit: number) {
    const queryParams =
      from >= 0 && limit ? `?from=${from}&limit=${limit}` : '';
    return this.httpService.get(`${PRODUCTS_URL}${queryParams}`).toPromise();
  }
  addProduct(product: any) {
    console.log('ADd');
    const Add_URL = `${PRODUCTS_URL}/addProduct`;
    this.httpService.post(Add_URL, { product: product }).toPromise();
  }

  deleteProduct(id: string) {
    const DELETE_URL = `${PRODUCTS_URL}/deleteProduct?id=${id}`;
    this.httpService.post(DELETE_URL, {}).toPromise();
  }

  updateProduct(product: any) {
    console.log(product);
    const UPDATE_URL = `${PRODUCTS_URL}/updateProduct`;
    this.httpService.put(UPDATE_URL, { product }).toPromise();
  }
}
