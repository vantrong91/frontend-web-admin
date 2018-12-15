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
  constructor(@Inject(IQuotationServiceToken) private quotationService: IQuotationService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    console.log(search);

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

  searchByPressEnter(event) {

    if (event.keyCode == 13)
      this.search(this.searchObject);
  }

  getStateQuotation(state) {
    switch (state) {
      case -1: return `Báo giá mới tạo chờ phản hồi Lái xe`;
      case 0: return `Báo giá mới tạo ( => Chờ phản hồi )`;
      case 1: return `Báo giá được Khách hàng chấp nhận (=> Chưa xác nhận chuyến)`;
      case 2: return `Báo giá bị khách hàng từ chối (=> KH Chọn báo giá khác)`;
      case 3: return `Báo giá được xác nhận chuyến (=> Chờ nhưng chưa thực hiện )`;
      case 4: return `Báo giá chờ vận chuyển ( Đang thực hiện )`;
      case 5: return `Báo giá Chủ hàng có thay đổi`;
      case 6: return `Báo giá bị Lái xe hủy`;
      case 7: return `Báo giá đang vận chuyển`;
      case 8: return `Báo giá Chủ hàng đã thanh toán`;
      case 9: return `Hủy do hệ thống`;
      default: return `Trạng thái không tồn tại`;
    }
  }
}
