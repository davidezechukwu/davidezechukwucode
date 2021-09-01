import { Injector, Injectable } from '@angular/core';
import { LocalisationService } from '../LocalisationService/LocalisationService';
import { SuperService, WebContracts } from '../SuperService/SuperService';
import { environment } from '../../../environments/environment'
import { IDType } from 'decode.web.contracts.typescript';

@Injectable()
export class ProfileService extends SuperService {

  protected profile: WebContracts.IProfileModel;

  get Language_ISO639_1_Code() {
    return this.profile.Language_ISO639_1_Code;
  }
  set Language_ISO639_1_Code(language_ISO639_1_Code: string) {
    this.profile.Language_ISO639_1_Code = language_ISO639_1_Code;
    this.SaveProfile();
  }

  get Language_IsRTL() {
    return this.profile.Language_IsRTL;
  }
  set Language_IsRTL(isRTL: boolean) {
    this.profile.Language_IsRTL = isRTL;
    this.SaveProfile();
  }

  get ShowBackgroundVideo() {
    return this.profile.ShowBackgroundVideo;
  }
  set ShowBackgroundVideo(showBackgroundVideo: boolean) {
    this.profile.ShowBackgroundVideo = showBackgroundVideo;
    this.SaveProfile();
  }

  get DisableAnimations() {
    return this.profile.DisableAnimations;
  }
  set DisableAnimations(disableAnimations: boolean) {
    this.profile.DisableAnimations = disableAnimations;
    this.SaveProfile();
  }

  get IsOnLowSpeedConnection() {
    return this.profile.IsOnLowSpeedConnection;
  }
  set IsOnLowSpeedConnection(isOnLowSpeedConnection: boolean) {
    this.profile.IsOnLowSpeedConnection = isOnLowSpeedConnection;
    this.SaveProfile();
  }

  constructor(
    protected Injector: Injector,
    protected LocalisationService: LocalisationService
  ) {
    super(Injector);
    this.profile = {      
      Language_ISO639_1_Code: environment.DefaultLanguage.ISO639_1_Code,
      Language_IsRTL: environment.DefaultLanguage.IsRTL,
      IsOnLowSpeedConnection: true,
      DisableAnimations: environment.Visuals.DisableAnimations,
      ShowBackgroundVideo: environment.Visuals.ShowBackgroundVideo
    } as WebContracts.IProfileModel;       
  };

  protected GetProfile(): WebContracts.IProfileModel {
    //if authenticated, read from storage
    //else return a generic profile based on environment settings, cookies and HTML storage
    //todo
    return this.profile;
  }

  protected SaveProfile(): Promise<WebContracts.IProfileModel> {
    return Promise.resolve(this.profile);
  }
}
