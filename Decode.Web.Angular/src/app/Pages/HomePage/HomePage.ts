import { Component, Input, OnInit, Injector } from '@angular/core';
import { SuperPage } from '../SuperPage/SuperPage';
import { PageAnimations } from '../../AppCore/Animations/PageAnimations';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'HomePage',
  templateUrl: './HomePage.html',
  styleUrls: ["./HomePage.scss"],
  animations: PageAnimations
})
export default class HomePage extends SuperPage implements OnInit {
  constructor(
    protected Injector: Injector
  ) {
    super(Injector);
    this.BackgroundVideoUrl = environment.HomePageBackgroundVideo.VideoUrl;
    this.PageTitle = this.CopyConstants.HOME;
  }

  ngOnInit(): void {
    super.ngOnInit();    
  }

  ngDoCheck(): void {
    this.PageTitle = this.CopyConstants.HOME;
    super.ngDoCheck();     
  }
}


