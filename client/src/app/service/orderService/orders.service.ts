import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const ORDER_URL = 'http://localhost:5000/orders';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public subject = new Subject<any>();
  constructor(private httpService: HttpClient) {}
  getOrder(cartId: string) {
    const result = this.httpService
      .post(`${ORDER_URL}?cartId=${cartId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    return result;
  }

  addOrder(order: string) {
    console.log(order);
    const ADD_CART_URL = `${ORDER_URL}/addOrder`;
    const result = this.httpService
      .post(`${ADD_CART_URL}`, {
        Authorization: localStorage.getItem('token'),
        order: order,
      })
      .toPromise();
    result.then(
      (value) => {
        console.log(value);
        this.subject.next(value);
      },
      (reason) => {
        console.log(reason);
      }
    );
    return result;
  }
  getOrdersNumber() {
    const ALL_ORDERS_URL = `${ORDER_URL}/getOrdersNumber`;
    const result = this.httpService.get(`${ALL_ORDERS_URL}`).toPromise();
    return result;
  }

  UpdateOrderObserve() {
    return this.subject.asObservable();
  }
}
