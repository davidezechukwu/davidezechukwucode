import { HostBinding, Component, Injector } from '@angular/core';
import * as _ from 'lodash';
import { SuperComponent } from '../SuperComponent/SuperComponent';

@Component({
  selector: 'ApplicationRootComponent',
  templateUrl: "./ApplicationRootComponent.html",
  styleUrls: ["./ApplicationRootComponent.scss"]
})

export default class ApplicationRootComponent extends SuperComponent {
  //When true, the special animation control binding @.disabled binding prevents all animations from rendering.
  //Place the @.disabled binding on an element to disable animations on the element itself, as well as any inner
  //animation triggers within the element.
  @HostBinding('@.disabled')
  DisableAnimations: boolean;

  constructor(
    Injector: Injector
  ) {
    super(Injector);
    this.DisableAnimations = this.ProfileService.DisableAnimations;
  };  
}
