import { Component, Input, OnInit, Injector } from '@angular/core';
import { SuperPage } from '../SuperPage/SuperPage';
import { PageAnimations } from '../../AppCore/Animations/PageAnimations';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'ContactUsPage',
  templateUrl: './ContactUsPage.html',
  styleUrls: ["./ContactUsPage.scss"],
  animations: PageAnimations
})
export default class ContactUsPage extends SuperPage {
  constructor(
    protected Injector: Injector
  ) {
    super(Injector);    
    this.BackgroundVideoUrl = environment.ContactUsPageBackgroundVideo.VideoUrl;    
    this.PageTitle = this.CopyConstants.CONTACT_US;
  }

  ngDoCheck(): void {
    this.PageTitle = this.CopyConstants.CONTACT_US;
    super.ngDoCheck();
  }
}


