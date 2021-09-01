import {Injector,Component,AfterContentChecked,AfterContentInit,AfterViewChecked,AfterViewInit,DoCheck,OnChanges,OnDestroy,OnInit,SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { NotificationService } from '../../Services/NotificationService/NotificationService';
import * as WebContracts from 'decode.web.contracts.typescript';
import { ComponentCommunicationService } from '../../Services/ComponentCommunicationService/ComponentCommunicationService';
import { ProfileService } from '../../Services/ProfileService/ProfileService';
import { LocalisationService } from '../../Services/LocalisationService/LocalisationService';
export * as WebContracts from 'decode.web.contracts.typescript';


@Component({
  template: "",
  providers: []
})
export class SuperComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  private _CopyConstants: WebContracts.ICopyConstants = Object.create({});
  get CopyConstants(): WebContracts.ICopyConstants {
    const language_ISO639_1_Code: string = this.ProfileService.Language_ISO639_1_Code.toLowerCase();
    if (language_ISO639_1_Code == "fr") {
      this._CopyConstants = new WebContracts.CopyConstantsFr();
      return this._CopyConstants;
    }/* else if (language_ISO639_1_Code == "de") {
      this._CopyConstants = new WebContracts.CopyConstantsDE();
      return this._CopyConstants;
    }else if (language_ISO639_1_Code == "es") {
      this._CopyConstants = new WebContracts.CopyConstantsES();
      return this._CopyConstants;
    }
    etc
    etc
    etc
    */
    else {
      this._CopyConstants = new WebContracts.CopyConstantsEn();
      return this._CopyConstants;
    }
  }
  protected ActivatedRouteService: ActivatedRoute;
  protected NotificationService: NotificationService;
  protected Router: Router;
  protected HttpClient: HttpClient;
  protected ComponentCommunicationService: ComponentCommunicationService;
  public LocalisationService: LocalisationService;
  public ProfileService: ProfileService;


  constructor(
    protected Injector: Injector
  ) {
    this.Router = this.Injector.get(Router);
    this.HttpClient = this.Injector.get(HttpClient);
    this.ActivatedRouteService = this.Injector.get(ActivatedRoute);
    this.NotificationService = this.Injector.get(NotificationService);
    this.ComponentCommunicationService = this.Injector.get(ComponentCommunicationService);
    this.LocalisationService = this.Injector.get(LocalisationService);
    this.ProfileService = this.Injector.get(ProfileService);
  }


  public ngOnChanges(changes: SimpleChanges): void { }
  public ngOnInit(): void { }
  public ngDoCheck(): void { }
  public ngAfterContentInit(): void { }
  public ngAfterContentChecked(): void { }
  public ngAfterViewInit(): void { }
  public ngAfterViewChecked(): void { }
  public ngOnDestroy(): void { }

  public Localise(phrase: string): string {    
    return this.LocalisationService.Localise(phrase);
  }

  HandleWarning(warningMessage: string): void {        
    this.NotificationService.ShowWarning(this.CopyConstants.WARNING, warningMessage);
  };

  HandleError(errorMessage: string): void {
    this.NotificationService.ShowError(this.CopyConstants.ERROR, errorMessage);
  };
}

export { Params as ActivatedRouteParams } from '@angular/router';
