import {Injectable} from '@angular/core';
import * as moment from 'moment';


@Injectable()
export class HelperService {
    formatDateTime(dateValue, format?): any {
        if (format) {
            return moment(dateValue).format(format);
        }
        return moment(dateValue).format('DD/MM/YYYY');
    }

}
