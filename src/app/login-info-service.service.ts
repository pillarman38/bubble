import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import {Observable} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  loggedIn = false

  private messageSrc = new BehaviorSubject<string>("")
  currentMsg = this.messageSrc.asObservable()
  signupObj = {}
  constructor() { }

  changeMsg(message: string) {
    this.messageSrc.next(message)
  }
}

