import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import './product.component.css';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() deleteProductEvent = new EventEmitter<any>();
  @Output() updateProductEvent = new EventEmitter<any>();
  public basePath: string;
  public imagePath: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.basePath = '../../../assets/images/';
    this.imagePath = '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  deleteProduct(id: string) {
    this.deleteProductEvent.emit(id);
  }

  updateProduct(product: any) {
    this.updateProductEvent.emit(product);
  }

  ngOnInit(): void {
    this.imagePath =
      this.product?.image || this.basePath + this.product?.filename;
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
