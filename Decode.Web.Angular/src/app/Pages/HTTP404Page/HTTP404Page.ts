import { Component, Input, OnInit, Injector } from '@angular/core';
import { SuperPage } from '../SuperPage/SuperPage';
import { PageAnimations } from '../../AppCore/Animations/PageAnimations';

@Component({
  selector: 'HTTP404Page',
  templateUrl: './HTTP404Page.html',
  animations: PageAnimations
})
export default class HTTP404Page extends SuperPage {
  constructor(
    protected Injector: Injector
  ) {
    super(Injector);
  }

  ngDoCheck(): void {
    this.PageTitle = this.CopyConstants.NOT_FOUND;
    super.ngDoCheck();
  }
}


