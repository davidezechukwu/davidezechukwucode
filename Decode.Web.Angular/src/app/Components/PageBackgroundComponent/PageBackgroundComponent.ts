import { Component, Injector, Input } from '@angular/core';
import { SuperComponent } from '../SuperComponent/SuperComponent';
import { Subscription } from 'rxjs';
import { FeatureDetectionService } from '../../Services/FeatureDetectionService/FeatureDetectionService';
import { environment } from '../../../environments/environment';

declare var $: any;

@Component({
  selector: 'PageBackgroundComponent',
  templateUrl: "./PageBackgroundComponent.html",
  styleUrls: ["./PageBackgroundComponent.scss"]
})
export default class PageBackgroundComponent extends SuperComponent {  
  protected BackgroundVideoUrl: string;
  Subscription: Subscription;
  constructor(
    protected Injector: Injector,
  ) {
    super(Injector);    
    this.BackgroundVideoUrl = "";
    this.Subscription = this.ComponentCommunicationService.BackgroundVideovideoChange$.subscribe(backgroundVideoUrl => {
      if (this.BackgroundVideoUrl !== backgroundVideoUrl) {
        this.BackgroundVideoUrl = backgroundVideoUrl;        
        if (this.ProfileService.ShowBackgroundVideo && this.BackgroundVideoUrl) {
          //refer to https://www.w3.org/2010/05/video/mediaevents.html
          let theVideo = $('#PageBackgroundVideo')[0];
          theVideo.src = this.BackgroundVideoUrl;
          var playPromise = theVideo.play();
          if (playPromise !== undefined) {
            playPromise.then((aaaa: any) => {
              theVideo.muted = true;
            }).catch((reason: any) => {
              console.log(reason);
              if (!reason.toString().startsWith('DOMException: play()')) {                
                this.HandleWarning(this.CopyConstants.BACKGROUND_VIDEO_PLAYBACK_ERROR)  ;
              }
            });
          }
        }
      }
    });
  }

  CanPlayBackgroundVideo() {
    return !this.ProfileService.IsOnLowSpeedConnection && this.BackgroundVideoUrl;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.ProfileService.ShowBackgroundVideo) {
      new FeatureDetectionService(this.Injector).IsOnLowSpeedConnection()
        .then((isOnLowSpeedConnection: boolean) => {
          this.ProfileService.IsOnLowSpeedConnection = isOnLowSpeedConnection;
        }).catch((reason: any) => {
          console.log(reason);
          this.HandleWarning(this.CopyConstants.FEATURE_DETECTION_FAILURE);
        });
    }
  }
}



