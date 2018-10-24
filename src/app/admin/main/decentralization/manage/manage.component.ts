import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {



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
    { accountId: "19", userName: "username19", fullName: "fullname19", gender: "1", dateOfBirth: "1545031493506", acctType: "9" },
    { accountId: "29", userName: "username29", fullName: "fullname29", gender: "2", dateOfBirth: "1545031493507", acctType: "9" },
    { accountId: "39", userName: "username39", fullName: "fullname39", gender: "1", dateOfBirth: "1545031493508", acctType: "9" },
    { accountId: "49", userName: "username49", fullName: "fullname49", gender: "2", dateOfBirth: "1545031493509", acctType: "9" },
    { accountId: "59", userName: "username59", fullName: "fullname59", gender: "1", dateOfBirth: "1545031493503", acctType: "9" },
    { accountId: "69", userName: "username69", fullName: "fullname69", gender: "2", dateOfBirth: "1545031493504", acctType: "9" },
    { accountId: "79", userName: "username79", fullName: "fullname79", gender: "1", dateOfBirth: "1545031493505", acctType: "9" },
    { accountId: "89", userName: "username89", fullName: "fullname89", gender: "2", dateOfBirth: "1545031493510", acctType: "9" },
    { accountId: "99", userName: "username99", fullName: "fullname99", gender: "1", dateOfBirth: "1545031493511", acctType: "9" },
    { accountId: "109", userName: "username109", fullName: "fullname109", gender: "2", dateOfBirth: "1545031493523", acctType: "9" },
    { accountId: "119", userName: "username119", fullName: "fullname119", gender: "1", dateOfBirth: "1545031493512", acctType: "9" },
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
