import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import getPayload from 'src/app/service/Payload/getPayload';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css'],
})
export class PrintOrderComponent implements OnInit {
  @Input() OrderDetails: any;
  public userDetails: any;
  public date: string = '';
  constructor() {}

  ngOnInit(): void {
    const user = getPayload();
    this.userDetails = user.data[0];
    console.log(this.userDetails);
    console.log(this.OrderDetails);
    this.date = moment(this.OrderDetails.order.order_delivery_date).format(
      'DD/MM/YYYY'
    );
  }
}
