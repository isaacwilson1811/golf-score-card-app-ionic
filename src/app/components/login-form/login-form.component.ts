import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  error_msg = {
    'email': [
      { type: 'required', message: 'Provide email.' },
      { type: 'pattern', message: 'Email is not valid.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length should be 6 characters long.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: FirebaseService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.authService.signinUser(value)
      .then((response) => {
        this.errorMsg = "";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

}
