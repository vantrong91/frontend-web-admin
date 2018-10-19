import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-managepopup',
  templateUrl: './managepopup.component.html',
  styleUrls: ['./managepopup.component.scss']
})
export class ManagepopupComponent implements OnInit {

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
