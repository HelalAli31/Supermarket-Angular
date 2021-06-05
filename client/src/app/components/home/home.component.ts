import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/service/productService/products.service';
import { OrdersService } from 'src/app/service/orderService/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  public ordersNumber: any;
  public productsNumber: any;
  private _mobileQueryListener: () => void;
  public productToUpdate: any;
  public nOrders = 0;
  public nProducts = 0;
  public StopOrdersCount = setInterval(() => {
    this.nOrders++;
    if (this.nOrders === this.ordersNumber) {
      clearInterval(this.StopOrdersCount);
    }
  }, 50);
  public StopProductsCount = setInterval(() => {
    this.nProducts++;
    if (this.nProducts === this.productsNumber) {
      clearInterval(this.StopProductsCount);
    }
  }, 50);
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.ordersNumber;
    this.productsNumber;
  }

  updateProduct(product: any) {
    this.productToUpdate = product;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  async getOrdersNumber() {
    await this.ordersService.getOrdersNumber().then(
      (result) => {
        this.ordersNumber = result;
      },
      (reason: any) => {
        console.log(reason);
      }
    );
  }
  async getProductsNumber() {
    await this.productsService.getProductsNumber().then(
      (result) => {
        this.productsNumber = result;
      },
      (reason: any) => {
        console.log(reason);
      }
    );
  }
  ngOnInit() {
    this.getOrdersNumber();
    this.getProductsNumber();
    for (let index = 0; index < this.productsNumber; index++) {
      setTimeout(() => {
        this.productsNumber = index;
      }, 1000);
    }
  }
}
