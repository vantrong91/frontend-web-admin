import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'showData2'
})
export class ToStringPipe2 implements PipeTransform{
    transform(value: any){
        if(value === 0){
            return 'Chưa đăng ký xe rỗng';
        }
        if(value === 1){
            return 'Đơn hàng chờ xác nhận';
        }
        if(value === 2){
            return 'Có yêu cầu chưa báo giá';
        }
        if(value === 3){
            return 'Báo giá cao, cần xem lại báo giá';
        }
        if(value === 4){
            return 'Đang chờ vận chuyển';
        }
        if(value === 5){
            return 'Đang chở hàng';
        }else{
            return;
        }
    }
}