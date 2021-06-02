import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import getPayload from '../../service/Payload/getPayload';
import getIsAdmin from '../../service/Payload/isAdmin';
import { PopUpLoginComponent } from '../PopUpComponents/pop-up-login/pop-up-login.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public token: any;
  public loginFailed: string;

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.token = {};
    this.loginFailed = '';
  }
  openBottomSheet(): void {
    this.bottomSheet.open(PopUpLoginComponent);
  }

  async login() {
    this.loginFailed = '';
    this.token = await this.userService.LoginUser(this.email, this.password);
    if (this.token.userToken) {
      localStorage.setItem('token', JSON.stringify(this.token['userToken']));
      const isAdmin = getIsAdmin();
      if (isAdmin) {
        this.router.navigate([`/products/admin`]);
      } else {
        localStorage.setItem('token', JSON.stringify(this.token['userToken']));
        this.openBottomSheet();
      }
    } else this.loginFailed = this.token;
  }

  ngOnInit(): void {}
}
