import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LoginInfoService } from '../login-info-service.service';
import { Observable } from 'rxjs';

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

  message: string;
  invalidInfo = false;

  constructor(private http: HttpClient, private router:Router, private loginServ: LoginInfoService) { }

  login() {
    console.log( this.usernameOrEmail.nativeElement.value)
    let formData = new FormData();

    var loginForm = {
      email: this.usernameOrEmail.nativeElement.value,
      password: this.password.nativeElement.value
    }

    this.http.post('http://192.168.1.86:3001/api/management/login', loginForm).subscribe(res => {
      console.log(res)
      
      if(res['res'] == true) {
        this.router.navigateByUrl('/homePage')
        this.loginServ.loggedIn = true
        this.loginServ.changeMsg(res['user'])
        this.message = "hi"
      }
      if(res['res'] == false) {
        this.getAlertMsg.nativeElement.innerHTML = `<div class="alert">Incorrect login information</div>`
      }
    })
  }

  signUp(){
    if(this.passwordSignUp.nativeElement.value != this.passwordCheckSignUp.nativeElement.value) {
      this.getAlertMsgSignUp.nativeElement.innerHTML = `<div class="alertSignUp">Passwords do not match</div>`
    } else {
      this.loginServ.signupObj = {
        username: this.usernameSignUp,
        email: this.emailSignUp,
        password: this.passwordSignUp
      }
      this.router.navigateByUrl('/photoSelector')
    }
  }

  ngOnInit(): void {
    // this.loginServ.currentMsg.subscribe(message =>{
    //   this.message = message
    // })
  }
}
