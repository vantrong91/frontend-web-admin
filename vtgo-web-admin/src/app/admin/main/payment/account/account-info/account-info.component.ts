import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChildren, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { AccountViewModel, GenericValidator, compareValidator, IAccountService, IAccountServiceToken } from 'src/app/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  _entity: AccountViewModel;
  public addEditForm: FormGroup;
  mailValid = false;
  phoneValid = false;
  isShow = false;
  txtNoti = '';
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  @Input() set accountViewModel(account: AccountViewModel) {
    if (account.accountId !== 0) {
      this._entity = new AccountViewModel();
      this._entity = account;
      this.addEditForm.reset(account);
    } else {
      this.addEditForm.reset();
    }
  }
  @Output() accountViewModelChange = new EventEmitter<AccountViewModel>();
  @Output() closeModalEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
    @Inject(IAccountServiceToken) private accountService: IAccountService) {
    this.addEditForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]],
      password: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, compareValidator('password')]],
      accountType: ['', [Validators.required]],
    });
    this.validationMessages = {
      email: {
        required: 'Hãy nhập email của bạn',
        email: 'Email sai định dạng!!!',
      },
      fullName: {
        required: 'Hãy nhập tên!!!'
      },
      phoneNumber: {
        required: 'Số điện thoại không được bỏ trống',
        pattern: 'Số điện thoại sai định dạng'
      },
      password: {
        required: 'Mật khẩu không được bỏ trống',
        minlength: 'Sử dụng 3 kí tự trở lên cho mật khẩu của bạn',
        maxlength: 'Mật khẩu tối đa 25 kí tự'
      },
      confirmPassword: {
        required: 'Không được bỏ trống',
        compare: 'Mật khẩu không trùng khớp'
      },
      accountType: {
        required: 'Hãy chọn loại tài khoản'
      }
    }
    // Định nghĩa yêu cầu của validator cho người dùng với form
    // Chuyển qua bộ thông báo validation của form này
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  get password() {
    return this.addEditForm.get('password');
  }
  get passwordConfirm() {
    return this.addEditForm.get('confirmPassword');
  }

  ngOnInit() {
  }
  onSave(event) {
    this._entity = this.addEditForm.value;
    console.log(this._entity);
    this.accountViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }
  checkEmailPhone(event, type) {
    let searchParam = `{"searchParam": "` + event.target.value.toLowerCase() + `"}`;
    this.search(searchParam, type);
  }
  search(search, type) {
    switch (type) {
      case 'phoneNumber':
        if (this.addEditForm.get('phoneNumber').invalid) {
          this.phoneValid = false;
          this.isShow = false;
        } else {
          this.accountService.Get(search).subscribe(
            (response: any) => {
              if (response.data.length === 0) {
                this.isShow = true;
                this.phoneValid = true;
                setTimeout(() => {
                  this.isShow = false;
                }, 3000);
                this.txtNoti = 'Số điện thoại có thể sử dụng';
              } else {
                this.isShow = true;
                this.phoneValid = false;
                setTimeout(() => {
                  this.isShow = false;
                }, 3000);
                this.txtNoti = 'Số điện thoại đã được sử dụng';
              }
            }
          );
        }
        break;
      case 'email':
        if (this.addEditForm.get('email').invalid) {
          this.mailValid = false;
          this.isShow = false;
        } else {
          this.accountService.Get(search).subscribe(
            (response: any) => {
              if (response.data.length === 0) {
                this.isShow = true;
                this.mailValid = true;
                setTimeout(() => {
                  this.isShow = false
                }, 2000);
                this.txtNoti = 'Email có thể sử dụng';
              } else {
                this.isShow = true;
                this.mailValid = false;
                setTimeout(() => {
                  this.isShow = false;
                }, 2000);
                this.txtNoti = 'Email đã được sử dụng';
              }
            }
          );
        }
      default:
        this.txtNoti = '';
    }
  }
  ngAfterViewInit(): void {
    //Theo dõi sự thay đổi ẩn của form từng tí 1
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    //Hợp nhất sự kiện ẩn đã theo dõi với giá trị ko ẩn
    merge(this.addEditForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addEditForm);
    })
  }
}
