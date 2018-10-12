import { Component, Inject, OnInit, AfterViewChecked, ViewChild, Input } from '@angular/core';
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

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  _entityBalance: BalanceModel;
  searchParam: SearchModel;
  Arr = [];

  @Input() set balanceModel(balance: BalanceModel) {
    this._entityBalance = balance;
  }

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }
  

  ngOnInit() {
    this.getBalanceById(this._entityBalance);
  } 


  getBalanceById(balanceById: BalanceModel) {
    this.dataService.Post('balance/get-by-id', balanceById).subscribe(
      response => {
        if (response.status === 0) {
          this._entityBalance = response.data;
          console.log(this._entityBalance);
          this.Arr = Object.values(this._entityBalance[0].balance);
          console.log(this.Arr);    
        }
      }
    );
  }
  
  
  


}
