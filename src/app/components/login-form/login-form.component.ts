import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, SignInValues } from 'src/app/services/auth.service';

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

  newUserForm: FormGroup;
  successMsg2: string = '';
  errorMsg2: string = '';
  error_msg2 = {
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
    private auth: AuthService
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
    this.newUserForm = this.formBuilder.group({
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

  signIn(values: SignInValues) {
    this.auth.signinUser(values).then(
      () => this.errorMsg = "",
      err => { this.errorMsg = err.message; this.successMsg = "";}
    )
  }

  toggleNewForm(){
    document.getElementById('registerFormDiv').classList.toggle('hidden');
    document.getElementById('signInFormDiv').classList.toggle('hidden');
    document.getElementById('dontHave').classList.toggle('hidden');
  }

  signUp(values: SignInValues) {
    this.auth.createUser(values)
      .then((response) => {
        this.errorMsg2 = "";
        this.successMsg2 = "New user created.";
        // call log in
        this.auth.signinUser(values)
          .then((response) => {
            this.errorMsg2 = "";
          }, error => {
            this.errorMsg2 = error.message;
            this.successMsg2 = "";
          })
      }, error => {
        this.errorMsg2 = error.message;
        this.successMsg2 = "";
      })
  }

  oopsGoBack() {
    document.getElementById('registerFormDiv').classList.toggle('hidden');
    document.getElementById('signInFormDiv').classList.toggle('hidden');
    document.getElementById('dontHave').classList.toggle('hidden');
  }

}
