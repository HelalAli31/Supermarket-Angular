import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { FilterPipe } from '../../pipe/filter.pipe';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import getPayload from 'src/app/service/Payload/getPayload';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cartService/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Output() updateProductEvent2 = new EventEmitter<any>();
  public products: any;
  public filterModel: string;
  public filterProducts: any;
  public events: string[] = [];
  public opened: boolean = true;
  public productToUpdate: any;
  public from: number;
  public limit: number;
  public actionTypeIsAdd: boolean;
  public user: any;
  public actionState: string;
  public subscriber: any;
  public cartId: string;
  public items: any;
  public item: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private productsService: ProductsService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private cartItemsService: CartService
  ) {
    this.products = [];
    this.filterModel = '';
    this.limit = 12;
    this.from = 0;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.actionTypeIsAdd = false;
    this.user = {};
    this.actionState = '';
    this.cartId = '';
    this.items = [];
    this.item = {};
  }

  async ngOnInit() {
    await this.getProducts();
    const { data } = await getPayload();
    this.user = data;
    this.subscriber = this.route.params.subscribe((params) => {
      this.cartId = params['cartId'];
    });
    await this.getCartItems();
  }

  async getCartItems() {
    console.log('aa');
    this.items = await this.cartItemsService.getCartItems(this.cartId);
    console.log('items:', this.items);
  }

  async addItemsToCart(event: any) {
    this.item.product_id = event.id;
    this.item.amount = event.amount;
    this.item.cart_id = this.cartId;
    this.item.full_price = event.price * event.amount;
    this.items = await this.cartItemsService.addItemsToCart(this.item);
    console.log(this.items);
    await this.getCartItems();
  }

  async getProducts(valueName?: any, keyName?: any) {
    this.products = await this.productsService.getProducts(
      this.from,
      this.limit,
      valueName,
      keyName
    );
    this.filterProducts = this.products;
  }

  async addNewProduct(product: any) {
    const result = await this.productsService.addProduct(product);
    // this.actionState = this.actionState[0];
    await this.getProducts();
  }

  updateProduct(product: any) {
    this.productToUpdate = product;
    this.updateProductEvent2.emit(product);
  }

  async EditProduct(event: any) {
    await this.productsService.updateProduct(event);
    await this.getProducts();
  }

  async prev() {
    if (this.from - this.limit < 0) return;
    this.from = this.from - this.limit;
    this.getProducts();
  }
  async next() {
    if (this.products.length < this.limit) return;
    this.from = this.from + this.limit;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriber.unsubscribe();
  }
}
