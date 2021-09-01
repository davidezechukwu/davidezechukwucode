import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NotificationService } from '../NotificationService/NotificationService';
import { ProfileService } from '../ProfileService/ProfileService';
import { SuperService, WebContracts } from '../SuperService/SuperService';
import { Injector } from '@angular/core';

export type HandleError =<T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class ErrorHandlerService extends SuperService{
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

  constructor(
    private ProfileService: ProfileService,
    private NotificationService: NotificationService,
    public Injector: Injector
  ) {
    super(Injector);
  }

  /** Create curried handleError function that already knows the service name */
  CreateHandleError = (serviceName = '') => {
    return <T>(operation = 'operation', result = {} as T) =>
      this.HandleError(serviceName, operation, result);
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the component that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  HandleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // log to console instead
      console.log(error); 

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      this.NotificationService.ShowError(this.CopyConstants.ERROR, `${serviceName}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of(result);
    };

  }
}
