import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-succesful-verification',
  templateUrl: './succesful-verification.component.html',
  styleUrls: ['./succesful-verification.component.css']
})
export class SuccesfulVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

//   function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// };

  ngOnInit(): void {
    
  }
}
