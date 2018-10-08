import { Component, OnInit } from '@angular/core';
import { AccountViewModel } from '../../../../core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accounts: AccountViewModel[] = [
  {
    "accountId": 1,
    "accountToken": 1,
    "accountType": 1,
    "deviceToken": 1,
    "email": "deptrai@gmail.com",
    "osType": 1,
    "password": "11111111111",
    "phoneNumber": "111"
  },
  {
    "accountId": 2,
    "accountToken": 2,
    "accountType": 2,
    "deviceToken": 3,
    "email": "tvhdhv@gmail.com",
    "osType": 3,
    "password": "123",
    "phoneNumber": "111"
  },
  {
    "accountId": 3,
    "accountToken": 3,
    "accountType": 3,
    "deviceToken": 2,
    "email": "thiendia@gmail.com",
    "osType": 3,
    "password": "456",
    "phoneNumber": "111"
  }]
  constructor( private modalService: NgbModal) { }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  view(accountId, content){
    
  }
  edit(accountId, content)
  {

  }
  ngOnInit() {
  }

}
