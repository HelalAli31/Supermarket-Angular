import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USER_URL = 'http://localhost:5000/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}
  LoginUser(email: string, password: string) {
    return this.httpService
      .post(`${USER_URL}/login`, { email, password })
      .toPromise();
  }
}
