import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
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
  constructor(
    public dialogRef: MatDialogRef<PopUpOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deliveryDate = moment(Date.now()).format('YYYY-MM-DD');
    this.visaNumber;
    this.street = '';
    this.city = '';
    this.minDate = moment(Date.now()).format('YYYY-MM-DD');
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
      this.street?.length
    ) {
      return true;
    } else {
      return alert(
        'something went wrong !!, check all details are required to continue'
      );
    }
  }

  AddOrder() {
    this.addOrderEvent.emit({
      deliveryDate: this.deliveryDate,
      visaNumber: this.visaNumber,
    });
  }
  ngOnInit(): void {}
}
