import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  quoteList = []

  ngOnInit(): void {
    this.http.get(`http://192.168.1.86:3001/api/management/quotes`).subscribe((res: any) => {
      console.log(res);
      this.quoteList = res.map(itm => itm['quote'])
      console.log(this.quoteList);
      
    })
  }
}
