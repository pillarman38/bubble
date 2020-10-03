import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class BubbleTrackerService {
  
  private messageSrc = new BehaviorSubject<Array<Object>>([])
  currentMsg = this.messageSrc.asObservable()

  constructor() { }

  changeMsg(message) {
    this.messageSrc.next(message)
  }
}
