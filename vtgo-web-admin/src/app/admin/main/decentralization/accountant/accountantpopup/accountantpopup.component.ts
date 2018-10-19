import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accountantpopup',
  templateUrl: './accountantpopup.component.html',
  styleUrls: ['./accountantpopup.component.scss']
})
export class AccountantpopupComponent implements OnInit {
  public addEditForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl(''),
      userName: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      acctType: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
  }

}
