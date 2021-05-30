import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-edit-item',
  templateUrl: './pop-up-edit-item.component.html',
  styleUrls: ['./pop-up-edit-item.component.css'],
  template: 'passed in {{ data.item }}',
})
export class PopUpEditItemComponent implements OnInit {
  public basePath: string;
  public amount: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { item: any },
    public dialogRef: MatDialogRef<PopUpEditItemComponent>
  ) {
    this.basePath = '../../../assets/images/';
    this.amount = data.item.amount;
  }

  SaveAmount() {
    this.dialogRef.close({
      amount: this.amount,
    });
  }

  ngOnInit(): void {}
}
