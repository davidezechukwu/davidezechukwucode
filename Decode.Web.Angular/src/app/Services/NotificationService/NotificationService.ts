import { Injector, Injectable } from '@angular/core';
import { SuperService } from '../SuperService/SuperService';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class NotificationService extends SuperService {  
  constructor(
    protected Injector: Injector,
    private toastrService: ToastrService
  ) {
    super(Injector);    
  };
  
  ShowError(heading: string, err: string): void {    
    this.toastrService.error(heading, err);
    console.log(err);
  };

  ShowWarning(heading: string, warning: string): void {
    this.toastrService.warning(heading, warning);
    console.log(warning);
  };

  ShowInfo(heading: string, info: string): void {
    this.toastrService.success(heading, info);
    console.log(info);
  };
}
