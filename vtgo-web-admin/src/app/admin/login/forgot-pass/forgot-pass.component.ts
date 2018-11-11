import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchModel, AccountViewModel, DataService } from 'src/app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SendMailModel } from '../../../core/models/send-mail.model';
import { SendSaltModel } from '../../../core/models/send-salt.model';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  email: string;
  code: string;
  EmailModel: SendMailModel;
  saltModel: SendSaltModel;
  SearchMail: SearchModel;
  accountByEmail: AccountViewModel;
  isShow = true;
  searchParam: SearchModel;
  constructor(private router: Router, private dataService: DataService,private toastr: ToastrService) { }
  accounts: AccountViewModel;
  allAccount: AccountViewModel;
  temp: any;
  allEmail = [];
  count: number;
  @Output() closeForm = new EventEmitter<any>();

  ngOnInit() {
    this.searchParam = new SearchModel();
    this.searchParam.searchParam = '';
    this.search();
    this.search2(this.searchParam);
  }

  search() {
    this.accounts = new AccountViewModel;
    this.accounts.accountId = 18102;
    this.dataService.Post('account-man/get-by-id', this.accounts).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
        }
      }
    );
  }


  search2(search) {
    this.dataService.Post('account-man/search', search).subscribe(
      response => {
        if (response.status === 0) {
          this.allAccount = response.data;
        }
      }
    );
  }

  sendEmail() {
    this.temp = Object.values(this.allAccount);
    var count;
    for (let item of this.temp) {
      this.allEmail.push(item.email);
    }
    this.isShow = false;
    for (var i = 0; i < this.allEmail.length; i++) {
      if (this.email == this.allEmail[i]) {
        this.temp = 1;
        break
      } else {
        this.temp = 0;
      }
    }
    if (this.temp == 1) {
      this.isShow= false;
      this.EmailModel = new SendMailModel;
      this.EmailModel.email = this.email;
      this.dataService.Post('email/send', this.EmailModel).subscribe(
        response => {
          console.log(response);
          if (response.status === 0) {
            this.toastr.info("Email đã được gửi");
          } else{
            this.toastr.error("Đã xảy ra lỗi");
          }
        }
      );  
      this.SearchMail = new SearchModel;
      this.SearchMail.searchParam = this.email;
      this.dataService.Post('account-man/search-by-email', this.SearchMail).subscribe(
        response => {
          this.accountByEmail = response.data;      
        }
      );
    } else {
      this.toastr.error("Email không tồn tại!");
      this.isShow= true;
    }
  }

  resetPassword() {
    console.log(this.accountByEmail);
    this.saltModel = new SendSaltModel;
    this.saltModel.salt = this.accountByEmail[0].salt; 
    if (this.accountByEmail[0].salt == this.code) {
      this.closeForm.emit();
      this.dataService.Post('email/reset-pass', this.saltModel).subscribe(
        response => {
          if (response.status === 0) {
            this.toastr.info("Mật khẩu của bạn đã được đặt lại mặc định là 123456");
          } else{
            this.toastr.error("Đã xảy ra lỗi");
          }  
        }
      );
    } else {
      this.toastr.error("Mã xác nhận của bạn không đúng. Vui lòng kiểm tra lại");
    }
  }


}
