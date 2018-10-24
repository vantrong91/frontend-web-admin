import { Component, Inject, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SearchModel,
  IHelperService,
  IHelperServiceToken,
  IQuotationServiceToken,
  IQuotationService
} from '../../../../core';



@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  @ViewChild('myTable') table: any;
  searchObject: SearchModel;
  expanded: any = {};
  listQuotation: any;
  temp: any;

  toggleExpandRow(row) {
      this.table.rowDetail.toggleExpandRow(row);
  }
  constructor( @Inject(IQuotationServiceToken) private quotationService: IQuotationService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.quotationService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {          
          this.listQuotation = response.data;       
        }
      },
      error => {
      }
    );
      

  }

  


}
