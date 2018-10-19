import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { DataService, AccountViewModel, BalanceModel } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reconfirm',
  templateUrl: './reconfirm.component.html',
  styleUrls: ['./reconfirm.component.scss']
})
export class ReconfirmComponent implements OnInit {


  closeResult = "";
  balanceHisId: AccountManViewModel;
  accounts: AccountViewModel;
  _entityBalance: BalanceModel;
  Arr = [];
  Arr1 = [];
  isShow = true;

  @Input() set accountManModel(accountManModel: AccountManViewModel) {
    this.balanceHisId = accountManModel;
  }
  @Output() closeForm = new EventEmitter<any>();

  public reconfirmForm: FormGroup;
  constructor(private modalServices: NgbModal,private toastr: ToastrService, private formBuilder: FormBuilder, private dataService: DataService) {
    this.reconfirmForm = this.formBuilder.group({
      transferAmount: new FormControl(),
      transferFees: new FormControl(),
    });
  }

  ngOnInit() {
    let search = '{}';
    console.log(this.balanceHisId);
    this.search(search);
    this.getBalanceById();
  }

  reconfirm() {
    this.closeForm.emit();
    this.Arr1[0].Consume = this.Arr1[0].Consume + this.reconfirmForm.value.transferAmount + this.reconfirmForm.value.transferFees;
    console.log(this.Arr1[0].Consume);
  }


  search(search) {
    this.dataService.Post('account-man/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
          console.log(this.accounts);
          this.Arr = Object.values(this.accounts);
          console.log(this.Arr);
        }
      }
    );
  }

  getBalanceById() {
    this.dataService.Post('balance/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          if (response.data === null) {
            this.closeForm.emit();
            this.isShow = false;
            this.toastr.error('Mã tài khoản không tồn tại!', 'Cảnh báo');
          } else {
            this._entityBalance = response.data;
            console.log(this._entityBalance);
            this.Arr1 = Object.values(this._entityBalance[0].balance);
            console.log(this.Arr1);
          }
        }
      }
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

}
