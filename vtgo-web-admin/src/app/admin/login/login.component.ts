import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  login(loginForm: NgForm){
    let userName = loginForm.form.value.userName;
    let password = loginForm.form.value.password;
    console.log(userName+password);
  }
  ngOnInit() {
    
  }

}
