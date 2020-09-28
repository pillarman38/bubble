import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  userId: string;
  token: string;

  private subscription: Subscription ;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    
    this.subscription = this.route.params.subscribe(params => {
      console.log(params)
      this.http.post('http://localhost:3001/api/management/verify', params).subscribe((res) => {
        console.log(res)
        if(res['err']) {
          this.router.navigateByUrl('/login')
        } else {
          this.router.navigateByUrl('/successfulverification')
        }
      })
    });
  }
}
