import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cartService/cart.service';
import { OrdersService } from 'src/app/service/orderService/orders.service';
import { PopUpOrderDetailsComponent } from '../pop-up-order-details/pop-up-order-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() items: any;
  @Input() fullPrice: any;
  @Input() cartId: any;
  @Input() userId: any;
  @Output() deleteCartItemEvent = new EventEmitter<any>();
  public basePath: string;
  public order: any;
  public orderStatus: any;
  public amount: number;

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    private cartService: CartService,
    private router: Router
  ) {
    this.basePath = '../../../assets/images/';
    this.order = {};
    this.orderStatus = '';
    this.amount = 1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpOrderDetailsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.AddOrder(result);
    });
  }

  DeleteItemFromCart(event: string) {
    console.log(event);
    this.deleteCartItemEvent.emit(event);
  }

  async AddOrder(result: any) {
    if (!this.items?.length || !result) return;
    console.log(this.userId, this.cartId, this.fullPrice, result);
    this.createOrderDetails(result);
    const resultStatus = this.orderService.addOrder(this.order);
    if (resultStatus) {
      resultStatus.then(
        (value: any) => {
          this.orderStatus = value.message;
          const cartId = value.order[0].cart_id;
          this.cartService.UpdateCartOpenState(cartId);
        },
        (reason: any) => {
          alert(reason);
        }
      );
    }
  }

  createOrderDetails(result: any) {
    this.order.user_id = this.userId;
    this.order.cart_id = this.cartId;
    this.order.order_delivery_date = result.deliveryDate;
    this.order.order_date = new Date(Date.now()).toString();
    this.order.last_visa_number = result?.visaNumber;
    this.order.total_price = this.fullPrice;
    this.order.city = result.city;
    this.order.street = result.street;
  }

  async newCart() {
    const newCart = await this.cartService.addCart(this.userId).then(
      (value: any) => {
        if (value.data) {
          const cart = value.data[0]._id;
          this.orderStatus = '';
          this.cartId = cart;
          this.items = [];
          this.fullPrice = 0;
          this.router.navigate([`/products/${cart}`]);
        }
      },
      (reason: any) => {
        alert(reason);
      }
    );
  }

  EditItemAmount(event: any, itemId: string) {
    console.log(event.target.value);
    console.log(itemId);
  }

  async ngOnChanges() {
    const a = await this.orderService.getOrder(this.cartId).then(
      (value: any) => {
        if (value.order.length) {
          console.log(value.order);
          this.orderStatus = 'Order Already done get new cart please';
        }
      },
      (reason) => {
        alert(reason);
      }
    );
  }

  async ngOnInit() {}
}
