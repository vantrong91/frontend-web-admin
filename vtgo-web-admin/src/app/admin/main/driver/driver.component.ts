import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  constructor() { }

  rows = [
    { stt: '1', gender: 'Male', company: 'Swimlane' },
    { stt: '2', gender: 'Male', company: 'KFC' },
    { stt: '3', gender: 'Female', company: 'Burger King' },
    { stt: '4', gender: 'Male', company: 'Swimlane' },
    { stt: '5', gender: 'Male', company: 'KFC' },
    { stt: '6', gender: 'Female', company: 'Burger King' },
  ];

  ngOnInit() {
  }

}
