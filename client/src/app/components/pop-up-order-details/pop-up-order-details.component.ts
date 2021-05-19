import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    public dialogRef: MatDialogRef<PopUpOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deliveryDate = Date.now();
    this.visaNumber;
    this.street = '';
    this.city = '';
  }

  onNoClick(): void {
    this.dialogRef.close({
      visaNumber: this.visaNumber,
      deliveryDate: this.deliveryDate,
      city: this.city,
      street: this.street,
    });
  }

  AddOrder() {
    this.addOrderEvent.emit({
      deliveryDate: this.deliveryDate,
      visaNumber: this.visaNumber,
    });
  }
  ngOnInit(): void {}
}
