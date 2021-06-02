import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cartService/cart.service';
import getPayload from 'src/app/service/Payload/getPayload';
import { UserService } from 'src/app/service/userService/user.service';
import { DialogComponent } from '../PopUpComponents/dialog/dialog.component';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent implements OnInit {
  public SignUserFormFirst: any;
  public SignUserFormSecond: any;
  public result: any;
  public resultStatus: string;
  public token: any;
  public userId: any;
  public cartId: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService
  ) {
    this.SignUserFormFirst = this.formBuilder.group({
      personal_id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.SignUserFormSecond = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
    this.result = '';
    this.resultStatus = '';
  }
  async SignUp() {
    const SignUpForm = {
      ...this.SignUserFormFirst.value,
      ...this.SignUserFormSecond.value,
    };
    console.log(SignUpForm);
    if (this.getValidationValues(SignUpForm)) {
      this.result = this.userService.SignUp(SignUpForm);
      if (this.result)
        this.result.then(
          (value: any) => {
            console.log(value);
            if (value.data) {
              this.resultStatus = `${value.message} try another email please. `;
              return;
            }
            this.SignUpDone_Login(value, SignUpForm);
          },
          (reason: any) => {
            alert(reason);
          }
        );
    } else {
      alert('check all details please!!');
    }
  }
  async SignUpDone_Login(value: any, SignUpForm: any) {
    console.log(SignUpForm);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { value },
    });
    await this.userService
      .LoginUser(SignUpForm['email'], SignUpForm['password'])
      .then(
        (result) => {
          this.token = result;
        },
        (reason) => {
          console.log(reason);
        }
      );
    localStorage.setItem('token', JSON.stringify(this.token['userToken']));
    console.log(this.token);
    this.resultStatus = '';

    this.OpenCart();
  }

  async OpenCart() {
    const userResult = await getPayload();
    this.userId = userResult.data[0]._id;
    console.log(this.userId);
    if (!this.userId) return;
    await this.createCart();
    console.log(this.cartId);
    this.router.navigate([`/products/${this.cartId}`]);
  }

  async createCart() {
    let cartIsAdded = false;
    const newCart = await this.cartService.addCart(this.userId).then(
      (value: any) => {
        if (value.data) {
          console.log(value.data);
          this.cartId = value.data[0]._id;
          cartIsAdded = true;
        }
      },
      (reason: any) => {
        alert(reason);
        cartIsAdded = false;
      }
    );
    return cartIsAdded;
  }
  getValidationValues(SignUpForm: any) {
    let validationSuccess = true;
    for (var key in SignUpForm) {
      if (SignUpForm.hasOwnProperty(key)) {
        if (!SignUpForm[key].length) validationSuccess = false;
      }
    }
    if (
      !SignUpForm['email'].includes('@') ||
      !SignUpForm['email'].includes('.') ||
      SignUpForm['password'] !== SignUpForm['confirmPassword']
    )
      validationSuccess = false;
    return validationSuccess;
  }

  ngOnInit(): void {}
}
