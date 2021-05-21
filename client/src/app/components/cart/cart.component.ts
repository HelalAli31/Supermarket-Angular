import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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

  constructor(private orderService: OrdersService, public dialog: MatDialog) {
    this.basePath = '../../../assets/images/';
    this.order = {};
    this.orderStatus = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpOrderDetailsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
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
    this.order.user_id = this.userId;
    this.order.cart_id = this.cartId;
    this.order.order_delivery_date = result.deliveryDate;
    this.order.order_date = new Date(Date.now()).toString();
    this.order.last_visa_number = result?.visaNumber;
    this.order.total_price = this.fullPrice;
    this.order.city = result.city;
    this.order.street = result.street;
    console.log(this.order);

    this.orderStatus = this.orderService.addOrder(this.order);
    if (this.orderStatus) {
      console.log(this.orderStatus);
      this.orderStatus = 'order successfully!';
    }
  }
  async ngOnInit() {}
}
