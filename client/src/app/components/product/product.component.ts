import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import './product.component.css';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import getPayload from 'src/app/service/Payload/getPayload';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cartService/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/service/orderService/orders.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() updateProductEvent = new EventEmitter<any>();
  @Output() AddItemsToCartEvent = new EventEmitter<any>();
  public basePath: string;
  public imagePath: string;
  public user: any;
  public subscription: Subscription;
  public amount: any;
  public resultStatus: any;
  public item: any;
  public ActionName: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private cartService: CartService,
    private orderService: OrdersService,
    public snackBar: MatSnackBar
  ) {
    this.basePath = '../../../assets/images/';
    this.imagePath = '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = [];
    this.amount = 1;
    this.item = {};
    this.ActionName = 'Add';
    this.subscription = this.cartService
      .getAddingToCart()
      .subscribe(async (result: any) => {
        this.openSnackBar(result);
      });
    this.subscription = this.orderService
      .UpdateOrderObserve()
      .subscribe(async (result: any) => {
        this.ActionName = 'Add';
      });
  }

  openSnackBar(result: any) {
    this.snackBar.open(result, 'Nice', {
      duration: 2000,
    });
  }

  updateProduct(product: any) {
    this.updateProductEvent.emit(product);
  }

  AddToCart(itemId: string, price: number) {
    this.item.amount = this.amount;
    this.item.id = itemId;
    this.item.price = price;
    this.AddItemsToCartEvent.emit(this.item);
    this.amount = 1;
    this.ActionName = 'Edit';
  }

  async ngOnInit() {
    this.imagePath =
      this.product?.image || this.basePath + this.product?.filename;
    const { data } = await getPayload();
    this.user = data;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    console.log('AAAAAA');
  }
}
