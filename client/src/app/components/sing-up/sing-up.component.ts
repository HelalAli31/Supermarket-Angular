import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.SignUserFormFirst = this.formBuilder.group({
      id: ['', Validators.required],
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

    if (this.getValidationValues(SignUpForm)) {
      this.result = this.userService.SignUp(SignUpForm);
      if (this.result)
        this.result.then(
          (value: any) => {
            this.resultStatus = value;
            setTimeout(() => {
              this.router.navigate([`/`]);
            }, 2000);
          },
          (reason: any) => {
            alert(reason);
          }
        );
    } else {
      alert('check all details please!!');
    }
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
      !SignUpForm['email'].includes('.')
    )
      validationSuccess = false;
    return validationSuccess;
  }

  ngOnInit(): void {}
}
