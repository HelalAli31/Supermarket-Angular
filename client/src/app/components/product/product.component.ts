import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import './product.component.css';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import getPayload from 'src/app/service/Payload/getPayload';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cartService/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/service/orderService/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpEditItemComponent } from '../PopUpComponents/pop-up-edit-item/pop-up-edit-item.component';
import * as Aos from 'aos';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() cart: any;
  @Output() updateProductEvent = new EventEmitter<any>();
  @Output() AddItemsToCartEvent = new EventEmitter<any>();
  public basePath: string;
  public imagePath: string;
  public userRole: string;
  public subscription: Subscription;
  public amount: any;
  public resultStatus: any;
  public item: any;
  public ActionName: string;
  public Price: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private cartService: CartService,
    private orderService: OrdersService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.basePath = '../../../assets/images/';
    this.imagePath = '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userRole = '';
    this.amount = 1;

    this.item = {};
    this.ActionName = 'Add';
    this.Price = {};
    this.subscription = this.cartService
      .getChangesToCart()
      .subscribe(async (result: any) => {
        this.openSnackBar(result);
        console.log('getChangesToCart');
        this.UpdateAction();
      });
    this.subscription = this.orderService
      .UpdateOrderObserve()
      .subscribe(async (result: any) => {
        this.ActionName = 'Add';
      });
  }

  openSnackBar(result: any) {
    const msg = result.replaceAll('"', '');
    this.snackBar.open(msg, 'Nice', {
      duration: 2000,
    });
  }

  updateProduct(product: any) {
    this.updateProductEvent.emit(product);
  }

  AddToCart(itemId: string, price: number) {
    const item = this.product;
    console.log(item);
    const dialogRef = this.dialog.open(PopUpEditItemComponent, {
      data: {
        image: item.filename,
        amount: this.amount,
        title: item.title,
        description: item.description,
        type: item.category._id,
      },
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      console.log(result);
      if (result?.amount === item?.amount) return;
      if (!result || !result.amount || result.amount < 0) return;
      const fullPrice = result.amount * item.price;
      this.item.amount = result.amount;
      this.item.id = itemId;
      this.item.price = price;
      this.AddItemsToCartEvent.emit(this.item);
      this.ActionName = 'Edit';
    });
  }

  async UpdateAction() {
    await this.cartService.getCartItems(this.cart)?.then(
      (result) => {
        this.UpdateActionButtonName(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
  UpdateActionButtonName(result: any) {
    if (!result || !Array.isArray(result)) return;
    if (!result.length) {
      this.ActionName = 'Add';
      this.amount = 1;
    }
    this.ActionName = 'Add';
    result.map((p: any) => {
      if (p.product_id._id == this.product._id) {
        this.ActionName = 'Edit';
        this.amount = p.amount;
      }
    });
  }

  async ngOnInit() {
    this.imagePath =
      this.product?.image || this.basePath + this.product?.filename;
    const { data } = await getPayload();
    const user = data[0]?.role;
    this.userRole = user;
    if (this.userRole === 'user') this.UpdateAction();

    this.amount = 1;
    Aos.init();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
