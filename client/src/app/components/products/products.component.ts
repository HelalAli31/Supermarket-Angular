import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { FilterPipe } from '../../pipe/filter.pipe';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: any;
  public filterModel: string;
  public filterProducts: any;
  public events: string[] = [];
  public opened: boolean = true;
  public productToUpdate: any;
  public from: number;
  public limit: number;
  public actionTypeIsAdd: boolean;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private productsService: ProductsService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.products = [];
    this.filterModel = '';
    this.limit = 10;
    this.from = 0;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.actionTypeIsAdd = false;
  }

  async ngOnInit() {
    await this.getProducts();
    console.log(this.products);
  }

  async getProducts() {
    this.products = await this.productsService.getProducts(
      this.from,
      this.limit
    );
    this.filterProducts = this.products;
  }

  async addNewProduct(product: any) {
    await this.productsService.addProduct(product);
    await this.getProducts();
  }
  async deleteProduct(id: any) {
    await this.productsService.deleteProduct(id);
    await this.getProducts();
  }
  updateProduct(product: any) {
    console.log('update', product);
    this.productToUpdate = product;
  }

  async EditProduct(event: any) {
    await this.productsService.updateProduct(event);
    await this.getProducts();
  }

  filterPipe(value: any, key: any) {
    console.log(value, key);
    const newPipe = new FilterPipe();
    this.filterProducts = newPipe.transform(this.products, key, value);
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
  }
}
