import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cartService/cart.service';
import getPayload from 'src/app/service/Payload/getPayload';

@Component({
  selector: 'app-pop-up-login',
  templateUrl: './pop-up-login.component.html',
  styleUrls: ['./pop-up-login.component.css'],
})
export class PopUpLoginComponent implements OnInit {
  public user: any;
  public cart: any;

  constructor(private cartService: CartService) {
    this.user = [];
    this.cart = [];
  }

  async ngOnInit() {
    this.user = await getPayload();
    if (this.user) {
      const result = await this.cartService.getCart(this.user.data[0]._id);
      if (result) {
        this.cart = result;
      }
    }
  }
}
