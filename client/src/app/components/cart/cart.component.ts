import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() items: any;
  public basePath: string;
  constructor() {
    this.basePath = '../../../assets/images/';
  }

  ngOnInit(): void {}
}
