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
        var arr1 = [11, 19, 27, 35, 55, 262, 43, 64, 241, 248, 255];
        var arr2 = [12, 20, 28, 36, 56, 263, 44, 65, 242, 249, 256];
        var arr3 = [13, 21, 29, 37, 57, 264, 45, 66, 243, 250, 257];
        var arr4 = [14, 22, 30, 38, 58, 265, 46, 67, 244, 251, 258];
        var arr5 = [15, 23, 31, 39, 59, 266, 47, 68, 245, 252, 259];
        var arr6 = [16, 24, 32, 40, 60, 267, 48, 69, 246, 253, 260];
        var arr7 = [17, 25, 33, 41, 61, 268, 49, 70, 247, 254, 261];
        if(arr1.includes(value)){
            return 'Xe dưới 3,5 tấn';
        }
        if(arr2.includes(value)){
            return 'Xe từ 3,5 tấn đến 7 tấn';
        }
        if(arr3.includes(value)){
            return 'Xe từ 7 tấn đến 10 tấn';
        }
        if(arr4.includes(value)){
            return 'Xe từ 10 tấn đến 15 tấn';
        }
        if(arr5.includes(value)){
            return 'Xe từ 15 tấn đến 18 tấn';
        }
        if(arr6.includes(value)){
            return 'Xe từ 18 tấn đến 24 tấn';
        }
        if(arr7.includes(value)){
            return 'Xe trên 24 tấn';;
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
export class TypeLicensePipe implements PipeTransform {

    transform(value: any) {
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
