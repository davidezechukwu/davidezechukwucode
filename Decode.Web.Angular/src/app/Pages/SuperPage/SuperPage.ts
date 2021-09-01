import { Component, Injector, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SuperComponent } from '../../Components/SuperComponent/SuperComponent';
import { environment } from '../../../environments/environment';

@Component({
  template: ""
})
export class SuperPage extends SuperComponent implements OnInit, DoCheck {
  protected TitleService: Title;
  DontShowBackgroundVideo: boolean = false;
  BackgroundVideoUrl: string;
  BackgroundVideoType: string;
  PageTitle: string;

  constructor(
    protected Injector: Injector
  ) {
    super(Injector);
        
    this.TitleService = this.Injector.get(Title);    
    this.BackgroundVideoUrl = "";
    this.BackgroundVideoType = "";
    this.PageTitle = "";
  }

  ngAfterViewInit(): void {    
    super.ngAfterViewInit();
    this.TitleService.setTitle(this.PageTitle);
    if (this.ProfileService.ShowBackgroundVideo) {
      if (this.BackgroundVideoUrl && this.BackgroundVideoUrl.length > 0) {
        this.ComponentCommunicationService.ChangeBackgroundVideovideo(this.BackgroundVideoUrl);
      } else {
        if (environment.DefaultBackgroundVideo.VideoUrl) {
          this.ComponentCommunicationService.ChangeBackgroundVideovideo(environment.DefaultBackgroundVideo.VideoUrl);
        }
      }
    }
  }

  SetCookie(cookieName: string, cookieValue: string, cookiePath?: string, keepForDays?: number) {
    var expires = "";
    if (!cookiePath) {
      cookiePath = "/";
    }
    if (keepForDays) {
      var d = new Date();
      d.setTime(d.getTime() + (keepForDays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
    }
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=" + cookiePath;
  }

  GetCookie(cookieName: string): string {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
