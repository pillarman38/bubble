import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  formData = new FormData();
  answered = false
  answer = ""

  constructor(private http: HttpClient, private loginInfo: LoginInfoService, private fb: FormBuilder) { }

  submitForm() {
    

    this.formData.append('answer', this.questionForm.get('answer').value);
    this.formData.append('user', this.loginInfo.loginObj['user'])
    this.formData.append('question', this.question)

    console.log(this.formData,this.questionForm);

    var str = JSON.stringify(this.formData.get('answer'))
    console.log(str);

    this.http.post('http://localhost:3001/api/management/answerquestion', this.formData).subscribe((res) => {
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
      user: localStorage.getItem('user'),
      today: today,
      nextWeek: week
    }
    
    this.http.post('http://localhost:3001/api/management/getchallengeorquestion', this.challengeObj).subscribe((res) => {
      console.log(res)
      if(res['res']['status'] == "question answered") {
        console.log(this.questionForm.controls['answer']);
        this.question = res['res']['question']
        this.answered = true
        this.answer = res['res']['answer']
        this.questionForm.controls['answer'].disable()
      }
      if(res['res']['res']['status'] == "not answered yet") {
        console.log("hi");
        console.log(this.questionForm.controls['answer']);
        this.question = res['res']['res']['question']
        this.answered = false
        this.answer = res['res']['res']['answer']
        this.questionForm.controls['answer'].enable()
      }
    })
  }
}
