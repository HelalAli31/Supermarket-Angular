import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private router: Router) {
    this.user = [];
    this.cart = [];
  }

  async OpenCart() {
    console.log('Open');
    console.log(this.user);
    if (this.user) {
      console.log('inside');
      const newCart = await this.cartService.addCart(this.user.data[0]._id);
      console.log(newCart);
      if (newCart) {
        console.log(newCart);
        this.cart = newCart;
        this.router.navigate([`/products/${this.cart[0]._id}`]);
      }
    }
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
