import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {



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
    { accountId: "16", userName: "username16", fullName: "fullname16", gender: "1", dateOfBirth: "1545031493506", acctType: "6" },
    { accountId: "26", userName: "username62", fullName: "fullname26", gender: "2", dateOfBirth: "1545031493507", acctType: "6" },
    { accountId: "36", userName: "username36", fullName: "fullname63", gender: "1", dateOfBirth: "1545031493508", acctType: "6" },
    { accountId: "46", userName: "username46", fullName: "fullname64", gender: "2", dateOfBirth: "1545031493509", acctType: "6" },
    { accountId: "65", userName: "username56", fullName: "fullname65", gender: "1", dateOfBirth: "1545031493503", acctType: "6" },
    { accountId: "66", userName: "username66", fullName: "fullname66", gender: "2", dateOfBirth: "1545031493504", acctType: "6" },
    { accountId: "76", userName: "username67", fullName: "fullname76", gender: "1", dateOfBirth: "1545031493505", acctType: "6" },
    { accountId: "86", userName: "username68", fullName: "fullname86", gender: "2", dateOfBirth: "1545031493510", acctType: "6" },
    { accountId: "96", userName: "username69", fullName: "fullname96", gender: "1", dateOfBirth: "1545031493511", acctType: "6" },
    { accountId: "106", userName: "username160", fullName: "fullname106", gender: "2", dateOfBirth: "1545031493523", acctType: "6" },
    { accountId: "116", userName: "username116", fullName: "fullname116", gender: "1", dateOfBirth: "1545031493512", acctType: "6" },
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
