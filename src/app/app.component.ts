import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginInfoService } from './login-info-service.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user;
  message: string;
  constructor(private router: Router, private loginServ: LoginInfoService) { }

  logout(e) {
    this.router.navigateByUrl('/login')
    localStorage.setItem('user', '')
    this.message = null
  }

  ngOnInit() {
    console.log(this.loginServ.loggedIn)
    
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == ""){
      this.message = null
      this.router.navigateByUrl('/login')
    } else {
      this.message = localStorage.getItem('user')
      this.router.navigateByUrl('/homepage')
      
      console.log(this.message);
    }
  }
}
