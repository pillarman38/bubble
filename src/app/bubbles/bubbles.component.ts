import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.css']
})
export class BubblesComponent implements OnInit {
  bubbles = []
  constructor() { }

  ngOnInit(): void {
    this.bubbles = [{
      percentage: '30,100',
      bubble: 1
    },
    {
      percentage: '47,100',
      bubble: 2
    },
    {
      percentage: '77,100',
      bubble: 3
    },
    {
      percentage: '20,100',
      bubble: 4
    },
    {
      percentage: '17,100',
      bubble: 5
    },
    {
      percentage: '14,100',
      bubble: 6
    },
    {
      percentage: '90,100',
      bubble: 7
    },
    {
      percentage: '70,100',
      bubble: 8
    },
    {
      percentage: '47,100',
      bubble: 9
    }, 
    {
      percentage: '27,100',
      bubble: 10
    },
    {
      percentage: '85,100',
      bubble: 11
    },
    {
      percentage: '62,100',
      bubble: 12
    }]
  }

}
