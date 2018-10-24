import { Component, Inject, OnInit, AfterViewChecked, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SearchModel,
  IHelperService,
  IHelperServiceToken,
  BalanceService,
  BalanceModel,
  DataService
} from '../../../../../core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  _entityBalance: BalanceModel;
  searchParam: SearchModel;
  Arr = [];
  balance: BalanceModel;
  search = '{}';
  isShow = true;

  @Input() set balanceModel(balance: BalanceModel) {
    this._entityBalance = balance;
  }

  @Output() closeForm = new EventEmitter<any>();
  
  constructor(private formBuilder: FormBuilder, private dataService: DataService,private toastr: ToastrService) { }


  ngOnInit() {
    this.getBalanceById(this._entityBalance);
  }


  getBalanceById(balanceById: BalanceModel) {
    this.dataService.Post('balance/get-by-id', balanceById).subscribe(
      response => {
        if (response.status === 0) {
          if (response.data === null) {
            this.closeForm.emit();
            this.toastr.error('Mã tài khoản không tồn tại!', 'Cảnh báo');
            this.isShow = false;
          } else {
            this._entityBalance = response.data;
            console.log(this._entityBalance);
            this.Arr = Object.values(this._entityBalance[0].balance);
            console.log(this.Arr);
          }
        }
      }
    );
  }

  getBalance(search) {
    this.dataService.Post('balance/search', search).subscribe(
      response => {
        console.log(response);
        if (response.status === 0) {
          this.balance = response.data;
          console.log(this.balance);
        }
      }
    );
  }





}
