import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.scss']
})
export class TechnicalComponent implements OnInit {



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
    { accountId: "18", userName: "username18", fullName: "fullname18", gender: "1", dateOfBirth: "1545031493506", acctType: "8" },
    { accountId: "28", userName: "username82", fullName: "fullname28", gender: "2", dateOfBirth: "1545031493507", acctType: "8" },
    { accountId: "38", userName: "username83", fullName: "fullname38", gender: "1", dateOfBirth: "1545031493508", acctType: "8" },
    { accountId: "48", userName: "username84", fullName: "fullname48", gender: "2", dateOfBirth: "1545031493509", acctType: "8" },
    { accountId: "58", userName: "username58", fullName: "fullname58", gender: "1", dateOfBirth: "1545031493503", acctType: "8" },
    { accountId: "68", userName: "username86", fullName: "fullname68", gender: "2", dateOfBirth: "1545031493504", acctType: "8" },
    { accountId: "78", userName: "username87", fullName: "fullname78", gender: "1", dateOfBirth: "1545031493505", acctType: "8" },
    { accountId: "88", userName: "username88", fullName: "fullname88", gender: "2", dateOfBirth: "1545031493510", acctType: "8" },
    { accountId: "98", userName: "username98", fullName: "fullname89", gender: "1", dateOfBirth: "1545031493511", acctType: "8" },
    { accountId: "108", userName: "username80", fullName: "fullname108", gender: "2", dateOfBirth: "1545031493523", acctType: "8" },
    { accountId: "118", userName: "username181", fullName: "fullname118", gender: "1", dateOfBirth: "1545031493512", acctType: "8" },
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
