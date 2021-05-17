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

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet
  ) {
    this.email = '';
    this.password = '';
    this.token = {};
  }
  openBottomSheet(): void {
    this.bottomSheet.open(PopUpLoginComponent);
  }

  async login() {
    this.token = await this.userService.LoginUser(this.email, this.password);
    if (this.token)
      localStorage.setItem('token', JSON.stringify(this.token['userToken']));
    this.openBottomSheet();
  }

  ngOnInit(): void {}
}
