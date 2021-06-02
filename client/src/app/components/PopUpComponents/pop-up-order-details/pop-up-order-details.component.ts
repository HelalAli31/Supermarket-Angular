import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { OrdersService } from 'src/app/service/orderService/orders.service';
import getPayload from 'src/app/service/Payload/getPayload';
@Component({
  selector: 'app-pop-up-order-details',
  templateUrl: './pop-up-order-details.component.html',
  styleUrls: ['./pop-up-order-details.component.css'],
})
export class PopUpOrderDetailsComponent implements OnInit {
  @Output() addOrderEvent = new EventEmitter<any>();
  public deliveryDate: any;
  public visaNumber: any;
  public street: string;
  public city: string;
  public minDate: any;
  public filteredItems: any;
  public filterModel: string;
  public orders: any;
  public value: Date;
  public disabledDates: any;
  public myInvalidDates: any;
  public InvalidDatesFilter: any;
  public user2: any = getPayload();

  constructor(
    public dialogRef: MatDialogRef<PopUpOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any },
    private orderService: OrdersService
  ) {
    this.deliveryDate = moment(Date.now()).format('YYYY-MM-DD');
    this.visaNumber;
    this.street = this.user2.data[0]?.street;
    this.city = this.user2.data[0]?.city;
    this.minDate = moment(Date.now()).format('YYYY-MM-DD');
    this.filteredItems = data.items;
    this.filterModel = '';
    this.value = this.deliveryDate;
    this.myInvalidDates = [];
  }

  onNoClick(): void {
    const validtionDetails = this.getValidationDetails();
    if (validtionDetails)
      this.dialogRef.close({
        visaNumber: this.visaNumber,
        deliveryDate: this.deliveryDate,
        city: this.city,
        street: this.street,
      });
  }

  getValidationDetails() {
    if (
      this.visaNumber?.toString().length == 4 &&
      this.deliveryDate?.valueOf().toString().length &&
      this.city?.length &&
      this.street?.length &&
      this.CheckValidDate()
    ) {
      return true;
    } else {
      return alert(
        'something went wrong !!, check all details are required to continue'
      );
    }
  }

  CheckValidDate() {
    const MomentDate = moment(this.deliveryDate).format('YYYY-MM-DD');
    const notValid = this.myInvalidDates.filter((date: any) => {
      return MomentDate == date;
    });
    if (notValid.length > 0) {
      return false;
    } else return true;
  }

  validationDatesAvailable() {
    const { order } = this.orders;
    if (!Array.isArray(this.orders.order)) return;
    const accountObjReduce = order.reduce(
      (orderObjs: any, currentOrder: any) => {
        const { order_delivery_date, _id, order_date } = currentOrder;
        const newAccount = !orderObjs[order_delivery_date]
          ? { order_delivery_date, FoundOrders: [{ order_delivery_date, _id }] }
          : {
              ...orderObjs[order_delivery_date],
              FoundOrders: [
                ...orderObjs[order_delivery_date].FoundOrders,
                { order_delivery_date, _id },
              ],
            };
        return {
          ...orderObjs,
          [order_delivery_date]: newAccount,
        };
      },
      {}
    );
    const newOrders: any = Object.values(accountObjReduce);

    const specificOrders = newOrders.filter((order: any) => {
      if (order['FoundOrders'].length > 2) {
        let Date = order['FoundOrders'][0].order_delivery_date;
        this.myInvalidDates.push(moment(Date).format('YYYY-MM-DD'));
        return order['FoundOrders'][0].order_delivery_date;
      }
    });
    this.InvalidDatesFilter = (d: any): boolean => {
      let a = this.myInvalidDates[1];
      const b: any = moment(a).format('YYYY-MM-DD');
      const ValidationDate = this.CC(d, b);
      console.log(ValidationDate);
      return !ValidationDate;
    };
  }

  CC(d: any, b: any) {
    let calendaerDate = moment(d).format('YYYY-MM-DD');
    return this.myInvalidDates.find((date: any) => {
      return calendaerDate == date;
    });
  }

  AddOrder() {
    this.addOrderEvent.emit({
      deliveryDate: this.deliveryDate,
      visaNumber: this.visaNumber,
    });
  }

  filterOperation() {
    const newPipe = new FilterPipe();
    this.filteredItems = newPipe.transform(this.data.items, this.filterModel);
  }
  async ngOnInit() {
    await this.orderService.getAllOrders().then(
      (result: any) => {
        if (!result) return;
        this.orders = result;
        this.validationDatesAvailable();
      },
      (reason: any) => {
        console.log(reason);
      }
    );
  }
}
