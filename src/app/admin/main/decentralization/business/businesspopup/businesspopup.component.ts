import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-businesspopup',
  templateUrl: './businesspopup.component.html',
  styleUrls: ['./businesspopup.component.scss']
})
export class BusinesspopupComponent implements OnInit {

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
