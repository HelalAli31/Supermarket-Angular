import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const CART_URL = 'http://localhost:5000/cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public subject = new Subject<any>();
  constructor(private httpService: HttpClient) {}
  getCart(userId: string) {
    const result = this.httpService
      .post(`${CART_URL}?userId=${userId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    return result;
  }

  UpdateCartOpenState(cartId: string) {
    const result = this.httpService
      .post(`${CART_URL}/updateOpenedCartStatus?cartId=${cartId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    return result;
  }

  addCart(userId: string) {
    const ADD_CART_URL = `${CART_URL}/addCart`;
    const result = this.httpService
      .post(`${ADD_CART_URL}?userId=${userId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();

    return result;
  }

  getCartItems(cartId: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const result = this.httpService
      .post(`${CART_URL}/getItems`, {
        Authorization: localStorage.getItem('token'),
        cartId,
      })
      .toPromise();
    return result;
  }

  editItemAmount(itemId: string, amount: number, fullPrice: number) {
    const EDIT_AMOUNT_URL = `${CART_URL}/editItemAmount`;
    const token = localStorage.getItem('token');
    if (!token) return;
    const result = this.httpService
      .post(`${EDIT_AMOUNT_URL}`, {
        Authorization: localStorage.getItem('token'),
        data: {
          fullPrice,
          amount,
          itemId,
        },
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
  deteleItemFromCart(itemId: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const result = this.httpService
      .put(
        `${CART_URL}/deleteItem?itemId=${itemId}`,
        {
          Authorization: localStorage.getItem('token'),
        },
        {
          headers: new HttpHeaders({
            Authorization: token,
          }),
          responseType: 'text',
        }
      )
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

  addItemsToCart(item: any) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const result = this.httpService
      .put(
        `${CART_URL}/AddItems`,
        {
          item,
          Authorization: localStorage.getItem('token'),
        },
        {
          headers: new HttpHeaders({
            Authorization: token,
          }),
          responseType: 'text',
        }
      )
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
  getChangesToCart() {
    return this.subject.asObservable();
  }
}
