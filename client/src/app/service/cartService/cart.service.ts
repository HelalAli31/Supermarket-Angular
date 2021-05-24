import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CART_URL = 'http://localhost:5000/cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
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

  deleteCart(cartId: string) {
    const ADD_CART_URL = `${CART_URL}/deleteCart`;
    const result = this.httpService
      .post(`${ADD_CART_URL}?cartId=${cartId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
    return result;
  }

  getCartItems(cartId: string) {
    console.log(cartId);
    const token = localStorage.getItem('token');
    if (!token) return;
    const result = this.httpService
      .post(`${CART_URL}/Items?cartId=${cartId}`, {
        Authorization: localStorage.getItem('token'),
      })
      .toPromise();
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
    return result;
  }
}
