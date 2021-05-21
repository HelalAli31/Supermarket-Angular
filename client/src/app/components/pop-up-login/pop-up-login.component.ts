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
    console.log(this.cart);
    this.router.navigate([`/products/${this.cart[0]._id}`]);
    this.bottomSheetRef.dismiss();
  }
  async OpenCart() {
    console.log(this.user);
    if (this.user) {
      const newCart = await this.cartService
        .addCart(this.user.data[0]._id)
        .then(
          (value: any) => {
            console.log(value.data[0]._id);
            this.cart = value.data[0]._id;
            this.router.navigate([`/products/${this.cart}`]);
            this.bottomSheetRef.dismiss();
          },
          (reason: any) => {
            alert(reason);
          }
        );
    }
  }

  async ngOnInit() {
    this.user = await getPayload();
    console.log(this.user.data[0].role);
    if (this.user) {
      const result = await this.cartService.getCart(this.user.data[0]._id).then(
        (value: any) => {
          this.cart = value.cart;
        },
        (reason: any) => {
          alert(reason);
          this.cart = [];
        }
      );
    }
  }
}
