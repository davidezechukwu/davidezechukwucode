import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
//import * as WebContracts from 'decode.web.contracts.typescript';

export * as WebContracts from 'decode.web.contracts.typescript';

export abstract class SuperService {

  protected DefaultHTTPGetOptions: {}
  protected DefaultHTTPPostOptions: {}
  protected APIRoot: string = '';
  protected Router: Router;
  protected HttpClient: HttpClient;
 
  constructor(
    protected Injector: Injector
  ) {
    this.Router = this.Injector.get(Router);
    this.HttpClient = this.Injector.get(HttpClient);    
    this.APIRoot = environment.RootApiPath.ServicePath;
    this.DefaultHTTPGetOptions = { withCredentials: true };
    this.DefaultHTTPPostOptions = { withCredentials: true };
  }
}



