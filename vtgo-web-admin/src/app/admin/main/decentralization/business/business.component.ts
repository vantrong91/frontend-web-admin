import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {



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
    { accountId: "1", userName: "username1", fullName: "fullname1", gender: "1", dateOfBirth: "1545031493506", acctType: "5" },
    { accountId: "2", userName: "username2", fullName: "fullname2", gender: "2", dateOfBirth: "1545031493507", acctType: "5" },
    { accountId: "3", userName: "username3", fullName: "fullname3", gender: "1", dateOfBirth: "1545031493508", acctType: "5" },
    { accountId: "4", userName: "username4", fullName: "fullname4", gender: "2", dateOfBirth: "1545031493509", acctType: "5" },
    { accountId: "5", userName: "username5", fullName: "fullname5", gender: "1", dateOfBirth: "1545031493503", acctType: "5" },
    { accountId: "6", userName: "username6", fullName: "fullname6", gender: "2", dateOfBirth: "1545031493504", acctType: "5" },
    { accountId: "7", userName: "username7", fullName: "fullname7", gender: "1", dateOfBirth: "1545031493505", acctType: "5" },
    { accountId: "8", userName: "username8", fullName: "fullname8", gender: "2", dateOfBirth: "1545031493510", acctType: "5" },
    { accountId: "9", userName: "username9", fullName: "fullname9", gender: "1", dateOfBirth: "1545031493511", acctType: "5" },
    { accountId: "10", userName: "username10", fullName: "fullname10", gender: "2", dateOfBirth: "1545031493523", acctType: "5" },
    { accountId: "11", userName: "username11", fullName: "fullname11", gender: "1", dateOfBirth: "1545031493512", acctType: "5" },
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
