import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  cruds = []
  
  constructor(private router: Router) { }
  nums = [1,2,3]
  logout(e) {
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.cruds = [1,2,3];
    this.router.navigateByUrl('/login')
  }
}
