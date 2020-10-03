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
  
  submitBubbleEntry() {
    let formData = new FormData();
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    formData.append('entry', this.bubbleEntry.get('entry').value);
    formData.append('user', this.user)
    console.log(formData);

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })

    let options = { headers: headers };

    this.http.post('http://localhost:3001/api/management/addbubbleitem', formData).subscribe((res) => {
      console.log(res)
      this.trackerServ.changeMsg(res)
    })
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
