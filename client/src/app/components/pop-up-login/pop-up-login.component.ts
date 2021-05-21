import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cartService/cart.service';
import getPayload from 'src/app/service/Payload/getPayload';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-pop-up-login',
  templateUrl: './pop-up-login.component.html',
  styleUrls: ['./pop-up-login.component.css'],
})
export class PopUpLoginComponent implements OnInit {
  public user: any;
  public cart: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<PopUpLoginComponent>
  ) {
    this.user = [];
    this.cart = [];
  }
  NavigateClick() {
    this.router.navigate([`/products/${this.cart[0]._id}`]);
    this.bottomSheetRef.dismiss();
  }
  async OpenCart() {
    console.log('Open');
    console.log(this.user);
    if (this.user) {
      console.log('inside');
      const newCart = await this.cartService.addCart(this.user.data[0]._id);
      if (newCart) {
        console.log(newCart);
        this.cart = newCart;
        this.router.navigate([`/products/${this.cart[0]._id}`]);
        this.bottomSheetRef.dismiss();
      } else {
        console.log('123');
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
