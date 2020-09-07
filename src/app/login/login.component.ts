import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfoService } from '../login-info-service.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passValidator } from './passvalidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('usernameOrEmail') usernameOrEmail: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('warning') warning: ElementRef;
  @ViewChild('getAlertMsg') getAlertMsg: ElementRef;

  @ViewChild('usernameSignUp') usernameSignUp: ElementRef;
  @ViewChild('emailSignUp') emailSignUp: ElementRef;
  @ViewChild('passwordSignUp') passwordSignUp: ElementRef;
  @ViewChild('passwordCheckSignUp') passwordCheckSignUp: ElementRef;
  @ViewChild('getAlertMsgSignUp') getAlertMsgSignUp: ElementRef;

  public obs$: Observable<boolean>
  message: string;
  invalidInfo = false;

  @Input() getAlertMsgBool = true
  @Input() signUpAlertMsg = true
  @Input() loginOrSignUp = true
  @Input() signUpAlertMsgPass = true
  @Input() emailInUse = false

  signupForm: FormGroup;
  loginForm: FormGroup;
  constructor(private http: HttpClient, private router:Router, private loginServ: LoginInfoService, private fb: FormBuilder) { 
    this.signupForm = fb.group({
      username: ["", [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]],
      email:["", Validators.email],
      password: ["", Validators.required],
      passwordTwo: ["", passValidator]
  });

  this.loginForm = fb.group({
    username: ["", Validators.required],
    email:["", Validators.required],
    password: ["", Validators.required, Validators.minLength(8)]
  });
console.log(this.signupForm.controls)
  this.signupForm.controls.password.valueChanges.subscribe(x =>  this.signupForm.controls.passwordTwo.updateValueAndValidity())
  
  }
  loginOrSignUpSwitch() {
    if(this.loginOrSignUp == true) {
      this.loginOrSignUp = false
    } else {
      this.loginOrSignUp = true
    }
  }

  navigation(url, res) {
    if(res['res'] == true) {
      this.router.navigateByUrl(url)
      this.loginServ.changeMsg(res['user'])
      this.message = "hi"
      this.getAlertMsgBool = false
    }
    if(res['res'] == false) {
      this.getAlertMsgBool = true
    }
  }

  onLoginFormSubmit() {
    let formData = new FormData();

    formData.append('username', this.signupForm.get('username').value);
    formData.append('password', this.signupForm.get('password').value);
    formData.append('email', this.signupForm.get('email').value);

    console.log(formData)

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
    let options = { headers: headers };

    console.log( this.usernameOrEmail.nativeElement.value)

    var loginForm = {
      email: this.usernameOrEmail.nativeElement.value,
      password: this.password.nativeElement.value
    }

    this.http.post('http://localhost:3001/api/management/login', loginForm).subscribe(res => {
      console.log(res)
      this.navigation('/homepage', res)
    })
  }

  handleKeyboardEvent($event) { 
    this.onLoginFormSubmit()
  }

  onFormSubmit() {
    let formData = new FormData();

    formData.append('username', this.signupForm.get('username').value);
    formData.append('password', this.signupForm.get('password').value);
    formData.append('email', this.signupForm.get('email').value);

    console.log(formData)

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
    let options = { headers: headers };

    this.http.post('http://localhost:3001/api/management/signup', formData).subscribe(res => {
      console.log(res)
      this.navigation('/emailVerify', res)
    })
  }

  ngOnInit(): void {
    this.loginServ.currentMsg.subscribe(message =>{
      this.message = message
    })
  }
}
