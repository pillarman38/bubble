import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LoginInfoService } from '../login-info-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('warning') warning: ElementRef;
  message: string;
  constructor(private http: HttpClient, private router:Router, private loginServ: LoginInfoService) { }

  login() {
    console.log( this.username.nativeElement.value)
    let formData = new FormData();

    var loginForm = {
      email: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    }

    this.http.post('http://192.168.1.86:3001/api/management/login', loginForm).subscribe(res => {
      console.log(res)
      if(res) {
        this.router.navigateByUrl('/homePage')
        this.loginServ.loggedIn = true
        this.loginServ.changeMsg("Logout")
      }
      if(res['results'] == false) {
        this.warning.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">Incorrect login information</div>`)
      }
    })
  }

  signUp(){
    this.router.navigateByUrl('/photoSelector')
  }

  ngOnInit(): void {
    this.loginServ.currentMsg.subscribe(message => this.message = message)
  }
}
