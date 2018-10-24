import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss']
})
export class AccountantComponent implements OnInit {



  closeResult: string;
  constructor(
    private modalServices: NgbModal,
    private dataService: DataService,
    private authenServices: AuthenService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

  }

  rows = [
    { accountId: "11", userName: "username11", fullName: "fullname11", gender: "1", dateOfBirth: "1545031493506", acctType: "7" },
    { accountId: "21", userName: "username21", fullName: "fullname2", gender: "2", dateOfBirth: "1545031493507", acctType: "7" },
    { accountId: "31", userName: "username31", fullName: "fullname3", gender: "1", dateOfBirth: "1545031493508", acctType: "7" },
    { accountId: "41", userName: "username41", fullName: "fullname4", gender: "2", dateOfBirth: "1545031493509", acctType: "7" },
    { accountId: "51", userName: "username51", fullName: "fullname5", gender: "1", dateOfBirth: "1545031493503", acctType: "7" },
    { accountId: "61", userName: "username61", fullName: "fullname6", gender: "2", dateOfBirth: "1545031493504", acctType: "7" },
    { accountId: "71", userName: "username71", fullName: "fullname7", gender: "1", dateOfBirth: "1545031493505", acctType: "7" },
    { accountId: "81", userName: "username81", fullName: "fullname8", gender: "2", dateOfBirth: "1545031493510", acctType: "7" },
    { accountId: "91", userName: "username91", fullName: "fullname9", gender: "1", dateOfBirth: "1545031493511", acctType: "7" },
    { accountId: "101", userName: "username101", fullName: "fullname10", gender: "2", dateOfBirth: "1545031493523", acctType: "7" },
    { accountId: "111", userName: "username111", fullName: "fullname11", gender: "1", dateOfBirth: "1545031493512", acctType: "7" },
  ];

  open(ele) {
    this.modalServices
      .open(ele, { size: 'lg' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );

  }

  private getDismissReason(reason: any) {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with ${reason}`;
    }
  }
  openSm(del, id) {
    this.modalServices.open(del, { size: 'sm' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
          this.dataService.Post('/delete', { accountId: id }).subscribe(
            result => {
              if (result.status === 0) {
                this.toastr.warning('Đã xóa chủ hàng có id là:' + id);
                this.loadData();
              } else {
                this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
              }
            }
          );
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );
  }





}
