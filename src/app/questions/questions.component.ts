import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfoService } from '../login-info-service.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  challengeObj = {}
  question = ""
  questionForm: FormGroup;
  constructor(private http: HttpClient, private loginInfo: LoginInfoService, private fb: FormBuilder) { }

  submitForm() {
    let formData = new FormData();

    formData.append('answer', this.questionForm.get('answer').value);
    formData.append('user', this.loginInfo.loginObj['user'])
    formData.append('question', this.question)

    console.log(formData,this.questionForm);

    var str = JSON.stringify(formData.get('answer'))
    console.log(str);

    this.http.post('http://localhost:3001/api/management/answerquestion', formData).subscribe((res) => {
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      answer: [''],
      user: ['']
    });

    var today = new Date().toString();

    function nextSunday(date, dayOfWeek) {
      var diff = date.getDay() - dayOfWeek;
      if (diff > 0) {
          date.setDate(date.getDate() + 6);
      }
      else if (diff < 0) {
          date.setDate(date.getDate() + ((-1) * diff))
      }
      return date.toString()
  }

  var date = new Date();
  
  console.log(nextSunday(date, 7), today)
  var week = nextSunday(date, 7)

    this.challengeObj = {
      user: this.loginInfo.loginObj['user'],
      today: today,
      nextWeek: week
    }
    
    this.http.post('http://localhost:3001/api/management/getchallengeorquestion', this.challengeObj).subscribe((res) => {
      console.log(res)
      this.question = res[0]['question']
    })
  }
}
