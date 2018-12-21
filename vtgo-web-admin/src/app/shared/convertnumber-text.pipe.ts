import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'showData'
})
export class ToStringPipe implements PipeTransform {
    transform(value: any) {
        if (value === 0) {
            return 'Admin';
        }
        if (value === 1) {
            return 'Lái xe';
        }
        if (value === 2) {
            return 'Chủ hàng';
        }
        if (value === 3) {
            return 'Chủ xe';
        }
        if (value === 4) {
            return 'Khách';
        }
        if (value === 5) {
            return 'Bộ phận Kinh doanh';
        }
        if (value === 6) {
            return 'Bộ phận Hỗ trợ';
        }
        if (value === 7) {
            return 'Bộ phận Kế toán';
        }
        if (value === 8) {
            return 'Bộ phận Kỹ thuật';
        }
        if (value === 9) {
            return 'Bộ phận Quản lý';
        }
        if (value === 10) {
            return 'Bộ phận Bảo hiểm';
        } else {
            return;
        }
    }
}