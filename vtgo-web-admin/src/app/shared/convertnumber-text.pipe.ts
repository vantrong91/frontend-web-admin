import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'showData'
})
export class ToStringPipe implements PipeTransform{
    transform(value: any){
        if(value === 0){
            return 'Admin';
        }
        if(value === 1){
            return 'Lái xe';
        }
        if(value === 2){
            return 'Chủ hàng';
        }
        if(value === 3){
            return 'Chủ xe';
        }else{
            return 'Khách';
        }
    }
}