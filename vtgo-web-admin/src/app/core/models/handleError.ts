export class ErrorHandle {
  resultCode: string;
  message: string;
  lstValidator: any[];
  constructor() {
    this.lstValidator = [];
  }
}

export interface FormError {
  error: string;
  params: any;
  control: any;
}
