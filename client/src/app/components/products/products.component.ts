import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterPipe } from '../../pipe/filter.pipe';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import getPayload from 'src/app/service/Payload/getPayload';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cartService/cart.service';

import { ProductsService } from 'src/app/service/productService/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
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
  public item: any;
  public ProductActionResult: String;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private productsService: ProductsService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private cartItemsService: CartService
  ) {
    this.products = [];
    this.filterModel = '';
    this.limit = 8;
    this.from = 0;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.actionTypeIsAdd = false;
    this.user = {};
    this.actionState = '';
    this.cartId = '';
    this.item = {};
    this.ProductActionResult = '';
  }

  async ngOnInit() {
    await this.getProducts();
    const { data } = await getPayload();
    this.user = data;
    this.subscriber = this.route.params.subscribe((params) => {
      this.cartId = params['cartId'];
    });
  }

  SignOut() {
    localStorage.clear();
    this.router.navigate([`/`]);
  }

  async addItemsToCart(event: any) {
    let isItemToADD = await this.checkItem(event);
    if (isItemToADD) {
      this.item.product_id = event.id;
      this.item.amount = event.amount;
      this.item.cart_id = this.cartId;
      this.item.full_price = event.price * event.amount;
      await this.cartItemsService.addItemsToCart(this.item);
    } else return;
  }

  async checkItem(event: any) {
    let Additem = true;
    await this.cartItemsService.getCartItems(this.cartId)?.then(
      async (result: any) => {
        let itemFound = this.findItem(result, event);
        if (itemFound?.length) {
          Additem = false;
          this.ItemFound_UpdateDetails(itemFound[0], event);
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
    return Additem;
  }

  findItem(result: any, newDetails: any) {
    if (!Array.isArray(result)) return;
    let found = result.filter((product) => {
      return product['product_id']['_id'] === newDetails.id;
    });
    return found;
  }

  async ItemFound_UpdateDetails(item: any, event: any) {
    if (!event.amount || event.amount < 0) return;
    const NewAmount = event.amount;
    const NewfullPrice = NewAmount * item.product_id.price;
    await this.cartItemsService.editItemAmount(
      item._id,
      NewAmount,
      NewfullPrice
    );
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
    await this.getProducts();
  }

  getProductDetails(product: any) {
    this.productToUpdate = product;
    this.updateProductEvent2.emit(product);
  }

  async editProduct(event: any) {
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
