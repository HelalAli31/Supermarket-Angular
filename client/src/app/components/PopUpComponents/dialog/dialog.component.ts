import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  public statusResult: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { value: string },
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.statusResult = '';
  }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data?.value);
    this.statusResult = this.data?.value;

    setTimeout(() => {
      this.dialogRef.close();
    }, 2500);
  }
}
