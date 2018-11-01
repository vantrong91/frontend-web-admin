import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInsuranceOrderServiceToken, IInsuranceOrderService, IHelperServiceToken, IHelperService, SearchModel, InsuOrderViewModel } from '../../../../core';

@Component({
  selector: 'app-insuranceorder',
  templateUrl: './insuranceorder.component.html',
  styleUrls: ['./insuranceorder.component.scss']
})
export class InsuranceorderComponent implements OnInit {

  listInsuranceOrder: any;
  searchObject: SearchModel;
  _entity: InsuOrderViewModel;

  constructor(private modalService: NgbModal,
    @Inject(IInsuranceOrderServiceToken) private insuOrderService: IInsuranceOrderService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) { }

  ngOnInit() {
    this.initData();
  }

  initData(){
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel){
    this.insuOrderService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listInsuranceOrder = response.data;
        }
      },
      error =>{

      }
    );
  }

  edit(row, content){
    this._entity = new InsuOrderViewModel();
    this._entity = row;
    this.modalService.open(content, { size: 'lg'});
  }

  onEditInsuOrder(event){
    console.log(event);
    this.insuOrderService.Put(this._entity).subscribe(
      (response: any) => {
        console.log(response);
        this.initData();
      }
    )
  }

}
