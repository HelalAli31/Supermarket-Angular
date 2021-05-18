import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import getPayload from '../../service/Payload/getPayload';
import { PopUpLoginComponent } from '../pop-up-login/pop-up-login.component';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public token: any;
  // public loginFailed: string;

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet
  ) {
    this.email = '';
    this.password = '';
    this.token = {};
    // this.loginFailed = '';
  }
  openBottomSheet(): void {
    this.bottomSheet.open(PopUpLoginComponent);
  }

  async login() {
    this.token = await this.userService.LoginUser(this.email, this.password);
    console.log(this.token);
    if (this.token.userToken) {
      localStorage.setItem('token', JSON.stringify(this.token['userToken']));
      this.openBottomSheet();
    }
    // else this.loginFailed = this.token;
  }

  ngOnInit(): void {}
}
