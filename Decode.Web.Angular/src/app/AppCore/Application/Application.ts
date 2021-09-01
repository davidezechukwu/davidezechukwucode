/*Modules*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApplicationRoutingModule } from '../Routing/Routing';
import { ToastrModule } from 'ngx-toastr';

/*Utils*/
import SafePipe from '../Pipes/SafePipe/SafePipe';

/*Pages*/
import HomePage from '../../Pages/HomePage/HomePage';
import ContactUsPage from '../../Pages/ContactUsPage/ContactUsPage';
import HTTP404Page from '../../Pages/HTTP404Page/HTTP404Page';

/*services*/
import { NotificationService } from '../../Services/NotificationService/NotificationService'
import { FeatureDetectionService } from '../../Services/FeatureDetectionService/FeatureDetectionService';
import { ErrorHandlerService } from '../../Services/ErrorHandlerService/ErrorHandlerService';
import { ComponentCommunicationService } from '../../Services/ComponentCommunicationService/ComponentCommunicationService';
import { LocalisationService } from '../../Services/LocalisationService/LocalisationService';
import { ProfileService } from '../../Services/ProfileService/ProfileService';

import { CakeService } from '../../Services/CakeService/CakeService';

/*components*/
import ApplicationRootComponent from '../../Components/ApplicationRootComponent/ApplicationRootComponent';
import TopMenuComponent from '../../Components/TopMenuComponent/TopMenuComponent';
import PageBackgroundComponent from '../../Components/PageBackgroundComponent/PageBackgroundComponent';
import CakeComponent from '../../Components/CakeComponent/CakeComponent';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    
    ApplicationRoutingModule,    
    HttpClientModule,    
    ToastrModule.forRoot()
  ],
  exports: [
  ],
  declarations: [
    ApplicationRootComponent,
    ContactUsPage,
    HTTP404Page,
    HomePage,
    PageBackgroundComponent,    
    TopMenuComponent,
    CakeComponent,
    SafePipe
  ],
  providers: [    
    FeatureDetectionService,    
    NotificationService,
    ErrorHandlerService,
    ComponentCommunicationService,
    LocalisationService,
    ProfileService,
    CakeService
  ],
  bootstrap: [ApplicationRootComponent],
})

export class ApplicationModule {

}
