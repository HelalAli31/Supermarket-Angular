import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cartService/cart.service';
import { OrdersService } from 'src/app/service/orderService/orders.service';
import { DialogComponent } from '../PopUpComponents/dialog/dialog.component';
import { PopUpDeleteItemComponent } from '../PopUpComponents/pop-up-delete-item/pop-up-delete-item.component';
import { PopUpEditItemComponent } from '../PopUpComponents/pop-up-edit-item/pop-up-edit-item.component';
import { PopUpOrderDetailsComponent } from '../PopUpComponents/pop-up-order-details/pop-up-order-details.component';
import { PopUpOrderDoneComponent } from '../PopUpComponents/pop-up-order-done/pop-up-order-done.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() cartId: any;
  @Input() userId: any;
  public fullPrice: number;
  public items: any;
  public basePath: string;
  public order: any;
  public orderStatus: any;
  public amount: number;
  public item: any;
  public subscription: Subscription;

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    private cartService: CartService,
    private router: Router
  ) {
    this.basePath = '../../../assets/images/';
    this.order = {};
    this.item = {};
    this.orderStatus = '';
    this.amount = 1;
    this.fullPrice = 0;
    this.items = [];
    this.subscription = this.cartService
      .getChangesToCart()
      .subscribe(async (messageObj) => {
        await this.getCartItems();
      });
  }

  openDialog(): void {
    if (!this.items || !this.items.length) return;
    const dialogRef = this.dialog.open(PopUpOrderDetailsComponent, {
      data: { items: this.items, fullPrice: this.fullPrice },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.AddOrder(result);
    });
  }

  async AddOrder(result: any) {
    if (!this.items?.length || !result) return;
    this.createOrderDetails(result);
    const resultStatus = this.orderService.addOrder(this.order);
    if (resultStatus) {
      resultStatus.then(
        (result: any) => {
          const value = result.message;
          this.AddOrder_dialog(value, result);
        },
        (reason: any) => {
          alert(reason);
        }
      );
    }
  }

  async AddOrder_dialog(value: any, MainResult: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        value,
        PrintOrderDetails: {
          items: this.items,
          order: MainResult.order[0],
        },
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.opanDialogDone(MainResult);
    });
  }

  opanDialogDone(result: any) {
    const cartId = result.order[0].cart_id;
    this.cartService.UpdateCartOpenState(cartId);
    this.fullPrice = 0;
    this.items = [];
    const dialogRef2 = this.dialog.open(PopUpOrderDoneComponent);
    dialogRef2.afterClosed().subscribe((result: any) => {
      if (result == 'true') {
        this.newCart();
      } else {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
  createOrderDetails(result: any) {
    this.order = {
      user_id: this.userId,
      cart_id: this.cartId,
      order_delivery_date: result.deliveryDate,
      order_date: new Date(Date.now()).toString(),
      last_visa_number: result?.visaNumber,
      total_price: result.total_price,
      city: result.city,
      street: result.street,
    };
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

  EditItemAmount(item: any) {
    console.log(item);
    const dialogRef = this.dialog.open(PopUpEditItemComponent, {
      data: {
        title: item.product_id.title,
        image: item.product_id.filename,
        amount: item.amount,
        description: item.product_id.description,
        type: item.product_id.category,
        price: item.product_id.price,
      },
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result?.amount === item?.amount) return;
      if (!result || !result.amount || result.amount < 0) return;
      const fullPrice = result.amount * item.product_id.price;
      await this.cartService.editItemAmount(item._id, result.amount, fullPrice);
    });
  }
  async getCartItems() {
    this.items = await this.cartService.getCartItems(this.cartId);
    if (!this.items.length) {
      this.fullPrice = 0;
      return;
    }
    if (this.items) this.fullPrice = 0;
    this.items.map((item: any) => {
      this.fullPrice += item.full_price;
    });
  }

  async UpdateStatus() {
    const a = await this.orderService.getOrder(this.cartId).then(
      (value: any) => {
        console.log(value);
        if (value.order.length) {
          this.items = [];
          this.fullPrice = 0;
          const dialogRef = this.dialog.open(PopUpOrderDoneComponent);
          dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'true') {
              this.newCart();
            } else {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          });
        }
      },
      (reason) => {
        alert(reason);
      }
    );
  }
  async clearCart() {
    const dialogRef = this.dialog.open(PopUpDeleteItemComponent, {
      data: {
        title: 'All items ',
      },
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      console.log(result);
      if (result == 'true') await this.cartService.clearCart(this.cartId);
    });
  }

  async DeleteItemFromCart(item: any) {
    const dialogRef = this.dialog.open(PopUpDeleteItemComponent, {
      data: {
        title: item.product_id.title,
      },
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      console.log(result);
      if (result == 'true') await this.cartService.deteleItemFromCart(item._id);
    });
  }

  async ngOnChanges() {
    this.UpdateStatus();
    this.getCartItems();
  }

  ngOnInit() {
    this.getCartItems();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
