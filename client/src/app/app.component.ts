import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './service/cartService/cart.service';
import getPayload from './service/Payload/getPayload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My SuperMarket';
  public user: any;
  public cartId: string = '';

  constructor(private router: Router, private cartService: CartService) {
    this.CheckLoginStatus();
  }

  async CheckLoginStatus() {
    const data = await getPayload();
    if (data) {
      this.user = data.data[0];
      await this.getCart();
    }
  }

  async getCart() {
    this.cartService.getCart(this.user._id).then(
      (result: any) => {
        this.cartId = result.cart[result.cart.length - 1]._id;
        this.router.navigate([`/products/${this.cartId}`]);
        console.log(this.cartId);
      },
      (reason: any) => {
        console.log(reason);
      }
    );
  }
}
