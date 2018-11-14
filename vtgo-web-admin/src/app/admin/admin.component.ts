import { Component, OnInit } from '@angular/core';
import { SystemConfig } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUser: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
    if(this.currentUser !== null){
      this.router.navigate([this.router.url]);
    }else{

    }
  }

}
