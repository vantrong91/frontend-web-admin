import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService, AccountViewModel, SearchModel } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  rows = "";
  data = [];
  showData = [];
  accountList: AccountViewModel;
  searchParam: SearchModel;
  accountData: AccountViewModel;
  closeResult: string;
  isAdd = false;
  isSetAvatar= true;

  @ViewChild('content') content: any;
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
    this.searchParam = new SearchModel();
    this.searchParam.searchParam2 = 5;
    this.search(this.searchParam);
    console.log(this.searchParam);
    
  }

  txtSearch(event) {
    this.search(this.searchParam);
  }


  search(search) {
    this.dataService.Post('account-man/search', search).subscribe(
      response => {
        if (response.status === 0) {
          this.data = response.data;
        }
      }
    );
  }

  getAccount(event) {
    this.accountData = event;
    if(this.accountData.fileAvata == null){
      this.accountData.fileAvata = ""
      this.isSetAvatar = false;
    } else{
      this.accountData.fileAvata = event.fileAvata;
      this.isSetAvatar = true;
    }
    this.open(this.content);
  }

  open(ele) {
    // this.accountData = new AccountViewModel;
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
          this.dataService.Post('account-man/delete', { accountId: id }).subscribe(
            result => {
              if (result.status === 0) {
                this.toastr.warning('Đã xóa tài khoản có id là:' + id);
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
