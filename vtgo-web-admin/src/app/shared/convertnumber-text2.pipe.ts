import { Pipe, PipeTransform, Inject, OnInit } from "@angular/core";
import { IAddressServiceToken, IAddressService, AddressViewModel } from "../core";

@Pipe({
    name: 'showData2'
})
export class ToStringPipe2 implements PipeTransform {

    transform(value: any) {
        if (value === 0) {
            return 'Chưa đăng ký xe rỗng';
        }
        if (value === 1) {
            return 'Đơn hàng chờ xác nhận';
        }
        if (value === 2) {
            return 'Có yêu cầu chưa báo giá';
        }
        if (value === 3) {
            return 'Báo giá cao, cần xem lại báo giá';
        }
        if (value === 4) {
            return 'Đang chờ vận chuyển';
        }
        if (value === 5) {
            return 'Đang chở hàng';
        } else {
            return;
        }
    }
}
@Pipe({
    name: 'showData3'
})
export class ToStringPipe3 implements PipeTransform {
    transform(value: any) {
        if (value === 10) {
            return 'Xe tải thùng bạt';
        }
        if (value === 18) {
            return 'Xe tải thùng kín';
        }
        if (value === 26) {
            return 'Xe đông lạnh';
        }
        if (value === 34) {
            return 'Xe ben';
        }
        if (value === 42) {
            return 'Xe cẩu chuyên dụng';
        }
        if (value === 52) {
            return 'Xe container';
        }
        if (value === 51) {
            return 'Xe fooc';
        }
        if (value === 52) {
            return 'Xe cứu hộ';
        }
        if (value === 53) {
            return 'Xe chuyên dùng chở ô tô';
        }
        if (value === 54) {
            return 'Xe taxi tải';
        }
        if (value === 62) {
            return 'Xe siêu trường, siêu trọng'
        } else {
            return '';
        }
    }
}
@Pipe({
    name: 'showWeight'
})
export class ToStringPipe4 implements PipeTransform {
    transform(value: any) {
        if (value === 11 || value === 19 || value === 27 || value === 55 || value === 64) {
            return 'Xe dưới 3,5 tấn';
        }
        if (value === 12 || value === 20 || value === 28 || value === 56 || value === 65) {
            return 'Xe từ 3,5 tấn đến 7 tấn';
        }
        if (value === 13 || value === 21 || value === 29 || value === 57 || value === 66) {
            return 'Xe từ 7 tấn đến 10 tấn';
        }
        if (value === 14 || value === 22 || value === 30 || value === 58 || value === 67) {
            return 'Xe từ 10 tấn đến 15 tấn';
        }
        if (value === 15 || value === 23 || value === 31 || value === 39 || value === 59 || value === 68) {
            return 'Xe từ 15 tấn đến 18 tấn';
        }
        if (value === 16 || value === 24 || value === 32 || value === 40 || value === 60 || value === 69) {
            return 'Xe từ 18 tấn đến 24 tấn';
        }
        if (value === 17 || value === 25 || value === 33 || value === 41 || value === 61 || value === 70) {
            return 'Xe trên 24 tấn';
        }
        if (value === 35) {
            return 'Xe dưới 5 tấn';
        }
        if (value === 36) {
            return 'Xe từ 5 tấn đến 8 tấn';
        }
        if (value === 37) {
            return 'Xe từ 8 tấn đến 12 tấn'
        }
        if (value === 38) {
            return 'Xe từ 12 tấn đến 15 tấn';
        } else {
            return 'Đang cập nhật';
        }
    }
};
// @Pipe({
//     name: 'showAddress'
// })
// export class ToStringPipeAddress implements PipeTransform{
//     address: any;
//     constructor(@Inject(IAddressServiceToken) private addressService: IAddressService) {};
//     transform(value: any) {
//         this.addressService.getById(value).subscribe(
//             (response:any) => {
//                 this.address = response.data[0];
//             }
//         )
//         return this.address.tenDinhDanh;
//     }
// };
@Pipe({
    name: 'showTypeLicense'
})
export class TypeLicensePipe implements PipeTransform{
    
    transform(value: any) {
        console.log("ihi");
        if (value === "8") {
            return 'FD';
        }
        if (value === "9") {
            return 'FE';
        }
        if (value === "131") {
            return 'B2';
        }
        if (value === "132") {
            return 'C';
        }
        if (value === "133") {
            return 'D';
        }
        if (value === "134") {
            return 'E';
        }
        if (value === "135") {
            return 'F';
        }
        if (value === "136") {
            return 'FB2';
        }
        if (value === "137") {
            return 'FC';
        }
        if (value === "138") {
            return 'FD';
        }
        if (value === "139") {
            return 'FE';
        } else {
            return "Đang cập nhật";
        }
    }
}
