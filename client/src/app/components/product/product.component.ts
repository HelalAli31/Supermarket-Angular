import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import './product.component.css';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import getPayload from 'src/app/service/Payload/getPayload';

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
  public selected: boolean;
  public amount: number;
  public item: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.basePath = '../../../assets/images/';
    this.imagePath = '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = [];
    this.selected = false;
    this.amount = 1;
    this.item = {};
  }

  updateProduct(product: any) {
    this.updateProductEvent.emit(product);
  }

  AddToCart(itemId: string, price: number) {
    this.item.amount = this.amount;
    this.item.id = itemId;
    this.item.price = price;
    this.AddItemsToCartEvent.emit(this.item);
    this.selected = false;
  }

  async ngOnInit() {
    this.imagePath =
      this.product?.image || this.basePath + this.product?.filename;
    const { data } = await getPayload();
    this.user = data;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
