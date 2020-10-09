import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BubbleTrackerService } from '../bubble-tracker.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  bubbleItems
  bubbleEntry: FormGroup;
  user = localStorage.getItem('user')

  constructor(private http: HttpClient, private fb: FormBuilder, private trackerServ: BubbleTrackerService) { 
    this.bubbleEntry = fb.group({
      entry: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.http.post(`http://localhost:3001/api/management/getbubble`, {user: this.user}).subscribe((res) => {
      console.log(res);
      this.bubbleItems = res
    })
    this.trackerServ.currentMsg.subscribe((res) => {
      console.log(res);
      this.bubbleItems = res
    })
  }
}
