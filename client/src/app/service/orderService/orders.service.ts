import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ORDER_URL = 'http://localhost:5000/orders';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpService: HttpClient) {}
  getOrder(orderId: string) {
    const result = this.httpService
      .post(`${ORDER_URL}?orderId=${orderId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    return result;
  }

  addOrder(order: string) {
    const ADD_CART_URL = `${ORDER_URL}/addOrder`;
    const result = this.httpService
      .post(`${ADD_CART_URL}`, {
        Authorization: localStorage.getItem('token'),
        order: order,
      })
      .toPromise();
    return result;
  }
}
