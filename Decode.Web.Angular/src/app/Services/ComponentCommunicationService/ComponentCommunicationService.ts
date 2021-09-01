import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { SuperService } from '../SuperService/SuperService';

@Injectable()
export class ComponentCommunicationService extends SuperService {

  // Observable string sources
  private backgroundVideovideoChangeSource = new Subject<string>();
  
  // Observable string streams
  public BackgroundVideovideoChange$ = this.backgroundVideovideoChangeSource.asObservable();

  constructor(    
    public Injector: Injector
  ) {
    super(Injector);
  }


  // Service message commands
  ChangeBackgroundVideovideo(backgroundVideovideoUrl: string) {
    this.backgroundVideovideoChangeSource.next(backgroundVideovideoUrl);
  }

}
