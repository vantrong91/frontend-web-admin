import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, AccountViewModel, SearchModel } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.component.html',
  styleUrls: ['./fogot-password.component.scss']
})
export class FogotPasswordComponent implements OnInit {
  verification: any;
  email: any;
  isShow = true;
  searchParam: SearchModel;
  constructor(private router: Router, private dataService: DataService,private toastr: ToastrService) { }
  accounts: AccountViewModel;
  allAccount: AccountViewModel;
  temp: any;
  allEmail = [];
  count: number;
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
      this.toastr.info("Email hợp lệ");
      this.isShow= false;
    } else {
      this.toastr.error("Email không tồn tại!");
      this.isShow= true;
    }
  }

  resetPassword() {
    if (this.accounts.salt == this.verification) {
      console.log("your password reseted!");
      alert("Mật khẩu của bạn đã được đặt lại là: 123456");
      this.router.navigate(['/admin/login']);
    } else {
      alert("Mã xác minh của bạn không chính xác. vui lòng kiểm tra lại");
    }
  }


}
