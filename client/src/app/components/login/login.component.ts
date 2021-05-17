import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import getPayload from '../../service/Payload/getPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public token: any;

  constructor(private userService: UserService) {
    this.email = '';
    this.password = '';
    this.token = {};
  }

  async login() {
    this.token = await this.userService.LoginUser(this.email, this.password);
    if (this.token)
      localStorage.setItem('token', JSON.stringify(this.token['userToken']));

    const { data } = await getPayload();
    console.log(data);
  }

  ngOnInit(): void {}
}
