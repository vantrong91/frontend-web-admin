import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {


  rows = [
    { stt: '1', gender: 'Male', company: 'Swimlane' },
    { stt: '2', gender: 'Male', company: 'KFC' },
    { stt: '3', gender: 'Female', company: 'Burger King' },
    { stt: '4', gender: 'Male', company: 'Swimlane' },
    { stt: '5', gender: 'Male', company: 'KFC' },
    { stt: '6', gender: 'Female', company: 'Burger King' },
  ];

  ngOnInit() { }
}
