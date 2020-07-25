import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginInfoService } from './login-info-service.service';
import {Observable} from 'rxjs'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  cruds = []
  user;
  message: string;
  constructor(private router: Router, private loginServ: LoginInfoService) { }

  nums = [1,2,3]
  logout(e) {
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.loginServ.currentMsg.subscribe(message =>{
      this.message = message
      console.log(this.message, message)
    })

    this.cruds = [1,2,3];
    this.router.navigateByUrl('/login')
  }
}
