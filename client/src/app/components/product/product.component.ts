import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
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
  public basePath: string;
  public imagePath: string;
  public user: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.basePath = '../../../assets/images/';
    this.imagePath = '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = [];
  }

  updateProduct(product: any) {
    this.updateProductEvent.emit(product);
  }

  async ngOnInit() {
    this.imagePath =
      this.product?.image || this.basePath + this.product?.filename;
    const { data } = await getPayload();
    this.user = data;
    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
